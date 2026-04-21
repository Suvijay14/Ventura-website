-- Strategy Intelligence tables (additive only; references existing organisations + profiles)

CREATE TABLE strategy_briefs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organisations(id),
  created_by UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  input_type TEXT NOT NULL,
  raw_input TEXT,
  document_name TEXT,
  document_content TEXT,
  status TEXT DEFAULT 'pending',
  current_phase TEXT,
  progress_pct INTEGER DEFAULT 0,
  quick_brief JSONB,
  full_report JSONB,
  go_no_go TEXT,
  confidence_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE strategy_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brief_id UUID REFERENCES strategy_briefs(id) ON DELETE CASCADE,
  org_id UUID REFERENCES organisations(id),
  section TEXT,
  source_title TEXT,
  source_url TEXT,
  snippet TEXT,
  relevance_score DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX strategy_briefs_org_id_idx ON strategy_briefs(org_id);
CREATE INDEX strategy_briefs_created_at_idx ON strategy_briefs(created_at DESC);
CREATE INDEX strategy_sources_brief_id_idx ON strategy_sources(brief_id);
CREATE INDEX strategy_sources_org_id_idx ON strategy_sources(org_id);

ALTER TABLE strategy_briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategy_sources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "strategy_briefs_select_own_org"
  ON strategy_briefs FOR SELECT TO authenticated
  USING (
    org_id IN (SELECT org_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "strategy_briefs_insert_own_org"
  ON strategy_briefs FOR INSERT TO authenticated
  WITH CHECK (
    org_id IN (SELECT org_id FROM profiles WHERE id = auth.uid())
    AND created_by = auth.uid()
  );

CREATE POLICY "strategy_briefs_update_own_org"
  ON strategy_briefs FOR UPDATE TO authenticated
  USING (
    org_id IN (SELECT org_id FROM profiles WHERE id = auth.uid())
  )
  WITH CHECK (
    org_id IN (SELECT org_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "strategy_sources_select_own_org"
  ON strategy_sources FOR SELECT TO authenticated
  USING (
    org_id IN (SELECT org_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "strategy_sources_insert_own_org"
  ON strategy_sources FOR INSERT TO authenticated
  WITH CHECK (
    org_id IN (SELECT org_id FROM profiles WHERE id = auth.uid())
    AND brief_id IN (
      SELECT id FROM strategy_briefs WHERE org_id IN (
        SELECT org_id FROM profiles WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "strategy_sources_delete_own_org"
  ON strategy_sources FOR DELETE TO authenticated
  USING (
    org_id IN (SELECT org_id FROM profiles WHERE id = auth.uid())
  );

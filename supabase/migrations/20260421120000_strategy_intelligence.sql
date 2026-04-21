-- Strategy Intelligence tables (additive only).
-- No FK to organizations: many Ventura deployments have no org table — rows are scoped by created_by (auth user).

CREATE TABLE strategy_briefs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID,
  created_by UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
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
  brief_id UUID NOT NULL REFERENCES strategy_briefs (id) ON DELETE CASCADE,
  org_id UUID,
  section TEXT,
  source_title TEXT,
  source_url TEXT,
  snippet TEXT,
  relevance_score DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX strategy_briefs_org_id_idx ON strategy_briefs (org_id);
CREATE INDEX strategy_briefs_created_at_idx ON strategy_briefs (created_at DESC);
CREATE INDEX strategy_briefs_created_by_idx ON strategy_briefs (created_by);
CREATE INDEX strategy_sources_brief_id_idx ON strategy_sources (brief_id);
CREATE INDEX strategy_sources_org_id_idx ON strategy_sources (org_id);

ALTER TABLE strategy_briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategy_sources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "strategy_briefs_select_own"
  ON strategy_briefs FOR SELECT TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "strategy_briefs_insert_own"
  ON strategy_briefs FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "strategy_briefs_update_own"
  ON strategy_briefs FOR UPDATE TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "strategy_sources_select_own"
  ON strategy_sources FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM strategy_briefs b
      WHERE b.id = strategy_sources.brief_id AND b.created_by = auth.uid()
    )
  );

CREATE POLICY "strategy_sources_insert_own"
  ON strategy_sources FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM strategy_briefs b
      WHERE b.id = strategy_sources.brief_id AND b.created_by = auth.uid()
    )
  );

CREATE POLICY "strategy_sources_delete_own"
  ON strategy_sources FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM strategy_briefs b
      WHERE b.id = strategy_sources.brief_id AND b.created_by = auth.uid()
    )
  );

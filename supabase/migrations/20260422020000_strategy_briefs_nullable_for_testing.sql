-- TEMP testing migration: allow unauthenticated Strategy Intel inserts.
-- Do not keep in production.
ALTER TABLE strategy_briefs ALTER COLUMN org_id DROP NOT NULL;
ALTER TABLE strategy_briefs ALTER COLUMN created_by DROP NOT NULL;

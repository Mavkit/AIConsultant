BEGIN;

INSERT INTO organizations (id, slug, name)
VALUES ('00000000-0000-4000-8000-000000000001', 'value-retail-pilot', 'Value Retail Pilot')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

INSERT INTO workspaces (id, organization_id, slug, name)
VALUES (
  '00000000-0000-4000-8000-000000000101',
  '00000000-0000-4000-8000-000000000001',
  'architecture-lab',
  'Architecture Lab'
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

INSERT INTO consultations (
  id,
  organization_id,
  workspace_id,
  workflow_id,
  title,
  status,
  created_by_subject
)
VALUES (
  '00000000-0000-4000-8000-000000001001',
  '00000000-0000-4000-8000-000000000001',
  '00000000-0000-4000-8000-000000000101',
  'architecture-discovery',
  'Local pilot consultation',
  'draft',
  'local-development'
)
ON CONFLICT (id) DO UPDATE SET updated_at = now();

COMMIT;

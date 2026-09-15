BEGIN;

CREATE TABLE IF NOT EXISTS schema_migrations (
  version text PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text NOT NULL CHECK (length(name) BETWEEN 1 AND 160),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
  slug text NOT NULL CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text NOT NULL CHECK (length(name) BETWEEN 1 AND 160),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, slug),
  UNIQUE (id, organization_id)
);

CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
  workspace_id uuid NOT NULL,
  workflow_id text NOT NULL,
  title text NOT NULL CHECK (length(title) BETWEEN 1 AND 240),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'review', 'completed', 'archived')),
  created_by_subject text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (id, organization_id),
  FOREIGN KEY (workspace_id, organization_id)
    REFERENCES workspaces(id, organization_id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS consultation_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
  consultation_id uuid NOT NULL,
  role text NOT NULL CHECK (role IN ('customer', 'assistant', 'consultant', 'system')),
  body text NOT NULL CHECK (length(body) > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (consultation_id, organization_id)
    REFERENCES consultations(id, organization_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS evidence_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
  workspace_id uuid NOT NULL,
  title text NOT NULL CHECK (length(title) BETWEEN 1 AND 240),
  source_type text NOT NULL CHECK (source_type IN ('customer-statement', 'uploaded-document', 'approved-knowledge', 'external-reference')),
  source_uri text,
  classification text NOT NULL DEFAULT 'internal' CHECK (classification IN ('public', 'internal', 'confidential', 'restricted')),
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, organization_id)
    REFERENCES workspaces(id, organization_id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS artifacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
  consultation_id uuid NOT NULL,
  artifact_type text NOT NULL,
  version integer NOT NULL DEFAULT 1 CHECK (version > 0),
  storage_key text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (consultation_id, artifact_type, version),
  FOREIGN KEY (consultation_id, organization_id)
    REFERENCES consultations(id, organization_id) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS consultations_org_workspace_idx
  ON consultations (organization_id, workspace_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS messages_org_consultation_idx
  ON consultation_messages (organization_id, consultation_id, created_at);
CREATE INDEX IF NOT EXISTS evidence_org_workspace_idx
  ON evidence_items (organization_id, workspace_id, created_at DESC);
CREATE INDEX IF NOT EXISTS artifacts_org_consultation_idx
  ON artifacts (organization_id, consultation_id, created_at DESC);

INSERT INTO schema_migrations (version)
VALUES ('001_foundation')
ON CONFLICT (version) DO NOTHING;

COMMIT;

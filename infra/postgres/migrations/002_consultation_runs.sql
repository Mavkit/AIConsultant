BEGIN;

CREATE TABLE IF NOT EXISTS consultation_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
  consultation_id uuid NOT NULL,
  provider text NOT NULL,
  model text NOT NULL,
  provider_response_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (consultation_id, organization_id)
    REFERENCES consultations(id, organization_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS consultation_runs_org_consultation_idx
  ON consultation_runs (organization_id, consultation_id, created_at DESC);

INSERT INTO schema_migrations (version)
VALUES ('002_consultation_runs')
ON CONFLICT (version) DO NOTHING;

COMMIT;

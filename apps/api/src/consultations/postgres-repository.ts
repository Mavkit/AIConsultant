import pg from "pg";

import type { ConsultationRepository, SaveConsultationInput, StoredConsultation } from "./repository.js";

export class PostgresConsultationRepository implements ConsultationRepository {
  private readonly pool: pg.Pool;

  constructor(environment: NodeJS.ProcessEnv = process.env) {
    this.pool = new pg.Pool({
      connectionString: environment.DATABASE_URL,
      host: environment.DATABASE_URL ? undefined : environment.PGHOST,
      port: environment.PGPORT ? Number.parseInt(environment.PGPORT, 10) : undefined,
      database: environment.PGDATABASE,
      user: environment.PGUSER,
      password: environment.PGPASSWORD,
      application_name: "el-rager-consultations",
      max: 5,
    });
  }

  async save(input: SaveConsultationInput): Promise<StoredConsultation> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const consultation = await client.query<{ id: string; created_at: Date }>(
        `INSERT INTO consultations (organization_id, workspace_id, workflow_id, title, status, created_by_subject)
         VALUES ($1, $2, $3, $4, 'active', $5)
         RETURNING id, created_at`,
        [input.principal.organizationId, input.principal.workspaceId, input.workflowId, input.title, input.principal.subject],
      );
      const row = consultation.rows[0];
      if (!row) throw new Error("Consultation insert returned no row");
      await client.query(
        `INSERT INTO consultation_messages (organization_id, consultation_id, role, body)
         VALUES ($1, $2, 'customer', $3),
                ($1, $2, 'assistant', $4)`,
        [input.principal.organizationId, row.id, input.context, JSON.stringify(input.answer)],
      );
      await client.query(
        `INSERT INTO consultation_runs (organization_id, consultation_id, provider, model, provider_response_id)
         VALUES ($1, $2, $3, $4, $5)`,
        [input.principal.organizationId, row.id, input.provider, input.model, input.responseId ?? null],
      );
      await client.query("COMMIT");
      return { id: row.id, createdAt: row.created_at.toISOString() };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

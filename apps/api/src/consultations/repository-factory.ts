import { InMemoryConsultationRepository } from "./in-memory-repository.js";
import { PostgresConsultationRepository } from "./postgres-repository.js";
import type { ConsultationRepository } from "./repository.js";

export function createConsultationRepository(environment: NodeJS.ProcessEnv = process.env): ConsultationRepository {
  return environment.DATABASE_URL || environment.PGHOST
    ? new PostgresConsultationRepository(environment)
    : new InMemoryConsultationRepository();
}

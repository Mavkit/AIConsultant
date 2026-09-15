import { randomUUID } from "node:crypto";

import type { ConsultationRepository, SaveConsultationInput, StoredConsultation } from "./repository.js";

export class InMemoryConsultationRepository implements ConsultationRepository {
  readonly items: SaveConsultationInput[] = [];

  async save(input: SaveConsultationInput): Promise<StoredConsultation> {
    this.items.push(input);
    return { id: randomUUID(), createdAt: new Date().toISOString() };
  }
}

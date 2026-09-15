import type { ConsultationAnswer } from "../ai/model-provider.js";
import type { Principal } from "../auth/principal.js";

export interface StoredConsultation {
  id: string;
  createdAt: string;
}

export interface SaveConsultationInput {
  principal: Principal;
  workflowId: string;
  title: string;
  context: string;
  answer: ConsultationAnswer;
  provider: string;
  model: string;
  responseId?: string;
}

export interface ConsultationRepository {
  save(input: SaveConsultationInput): Promise<StoredConsultation>;
  close?(): Promise<void>;
}

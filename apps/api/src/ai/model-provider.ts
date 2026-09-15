export interface ConsultationPrompt {
  workflowName: string;
  workflowPurpose: string;
  context: string;
  humanReview: "optional" | "recommended" | "required";
  safetyIdentifier: string;
}

export interface ConsultationAnswer {
  summary: string;
  analysis: string[];
  assumptions: string[];
  risks: string[];
  nextSteps: string[];
  humanReview: string;
}

export interface ModelResult {
  answer: ConsultationAnswer;
  provider: string;
  model: string;
  responseId?: string;
}

export interface ModelProvider {
  generateConsultation(prompt: ConsultationPrompt): Promise<ModelResult>;
}

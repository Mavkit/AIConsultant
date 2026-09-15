import OpenAI from "openai";

import type { ConsultationAnswer, ConsultationPrompt, ModelProvider, ModelResult } from "./model-provider.js";

interface ResponsesClient {
  responses: {
    create(input: Record<string, unknown>): Promise<{ id?: string; output_text?: string }>;
  };
}

const instructions = `You are EL Råger, Value Retail Consulting's transparent AI enterprise and solution architecture consultant for retail.
Return only valid JSON with these keys: summary (string), analysis (string array), assumptions (string array), risks (string array), nextSteps (string array), humanReview (string).
Separate evidence from assumptions. Do not claim access to customer systems or documents. Do not make final legal, security, financial, procurement, or executive decisions. Be concise, practical, and answer in Norwegian.`;

function parseAnswer(output: string): ConsultationAnswer {
  const raw = JSON.parse(output) as Partial<ConsultationAnswer>;
  const keys = ["analysis", "assumptions", "risks", "nextSteps"] as const;
  if (typeof raw.summary !== "string" || typeof raw.humanReview !== "string" || keys.some((key) => !Array.isArray(raw[key]) || raw[key]?.some((item) => typeof item !== "string"))) {
    throw new Error("Model returned an invalid consultation contract");
  }
  return raw as ConsultationAnswer;
}

export class OpenAIResponsesProvider implements ModelProvider {
  private readonly client: ResponsesClient;

  constructor(
    apiKey: string,
    private readonly model = "gpt-5.6-terra",
    client?: ResponsesClient,
  ) {
    this.client = client ?? (new OpenAI({ apiKey }) as ResponsesClient);
  }

  async generateConsultation(prompt: ConsultationPrompt): Promise<ModelResult> {
    const response = await this.client.responses.create({
      model: this.model,
      instructions,
      input: `Workflow: ${prompt.workflowName}\nPurpose: ${prompt.workflowPurpose}\nHuman review: ${prompt.humanReview}\nCustomer context:\n${prompt.context}`,
      max_output_tokens: 1_200,
      store: false,
      safety_identifier: prompt.safetyIdentifier,
      text: {
        format: {
          type: "json_schema",
          name: "consultation_answer",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["summary", "analysis", "assumptions", "risks", "nextSteps", "humanReview"],
            properties: {
              summary: { type: "string" },
              analysis: { type: "array", items: { type: "string" } },
              assumptions: { type: "array", items: { type: "string" } },
              risks: { type: "array", items: { type: "string" } },
              nextSteps: { type: "array", items: { type: "string" } },
              humanReview: { type: "string" },
            },
          },
        },
      },
    });

    if (!response.output_text) throw new Error("Model returned no text output");

    return {
      provider: "openai",
      model: this.model,
      responseId: response.id,
      answer: parseAnswer(response.output_text),
    };
  }
}

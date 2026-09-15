import { DeterministicModelProvider } from "./deterministic-provider.js";
import type { ModelProvider } from "./model-provider.js";
import { OpenAIResponsesProvider } from "./openai-responses-provider.js";

export function createModelProvider(environment: NodeJS.ProcessEnv = process.env): ModelProvider {
  const provider = environment.AI_PROVIDER ?? "deterministic";
  if (provider === "deterministic") return new DeterministicModelProvider();
  if (provider === "openai") {
    if (!environment.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is required when AI_PROVIDER=openai");
    return new OpenAIResponsesProvider(environment.OPENAI_API_KEY, environment.OPENAI_MODEL);
  }
  throw new Error(`Unsupported AI_PROVIDER '${provider}'`);
}

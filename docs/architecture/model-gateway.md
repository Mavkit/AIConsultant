# EL Råger model gateway

Status: First executable vertical slice  
Related ADR: [0002 Model-provider abstraction](decisions/0002-model-provider-abstraction.md)

## Contract

Consulting routes depend on the internal `ModelProvider` interface, never on provider SDK types. The interface accepts an approved workflow, customer context, required human-review level, and a pseudonymous safety identifier. It returns a structured answer containing a summary, analysis, assumptions, risks, next steps, and human-review guidance.

The deterministic provider is the default for local development and CI. It makes the complete workflow testable without credentials, network calls, variable model output, or usage charges. It is a fixture—not a production-quality consultant.

The optional OpenAI provider uses the Responses API through the official SDK. It sends `instructions`, `input`, the configured model, a strict JSON schema, a bounded output budget, and a SHA-256 safety identifier derived from the authenticated subject. It explicitly sets `store: false`. The adapter reads the SDK's aggregated `output_text` value and validates the JSON result before domain code can use or persist it.

Official references:

- [Create a response](https://developers.openai.com/api/reference/cli/resources/responses/methods/create)
- [OpenAI models](https://developers.openai.com/api/docs/models)

## Configuration

| Variable | Default | Purpose |
| --- | --- | --- |
| `AI_PROVIDER` | `deterministic` | Select `deterministic` or `openai` |
| `OPENAI_MODEL` | `gpt-5.6-terra` | Approved OpenAI model identifier |
| `OPENAI_API_KEY` | none | Required only for the OpenAI provider; inject from a secret store |

The default model is a configuration choice, not a domain dependency. A model change requires quality, safety, cost, and latency evaluation against representative retail architecture cases.

## Safety and privacy boundaries

- Browser input is limited to 8,000 characters and requires explicit AI acknowledgement.
- The create route is rate-limited to five requests per minute per API instance.
- Tenant identity is server-derived. The request contract rejects organization and workspace identifiers.
- Failed generation is not persisted as a consultation; the API returns a generic problem response and does not expose provider errors.
- The first slice does not use tools, web search, uploads, retrieval, or customer-system access.
- Model output remains advisory. The selected workflow defines whether human review is optional, recommended, or required.

Before production, replace the development identity adapter, use a distributed tenant-aware rate limiter, add moderation and prompt-injection evaluation, define regional data-processing controls, and verify observability redaction.

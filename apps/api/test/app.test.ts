import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";

import type { FastifyInstance } from "fastify";

import { buildApp } from "../src/app.js";
import { OpenAIResponsesProvider } from "../src/ai/openai-responses-provider.js";
import { InMemoryConsultationRepository } from "../src/consultations/in-memory-repository.js";

describe("EL Råger API", () => {
  let app: FastifyInstance;

  before(async () => {
    app = await buildApp();
    await app.ready();
  });

  after(async () => {
    await app.close();
  });

  it("reports health", async () => {
    const response = await app.inject({ method: "GET", url: "/health" });

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.json(), { status: "ok" });
  });

  it("reports an unconfigured database without blocking local readiness", async () => {
    const response = await app.inject({ method: "GET", url: "/ready" });

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.json(), {
      status: "ready",
      checks: { api: "ok", database: "not-configured" },
    });
  });

  it("blocks readiness when a required dependency is unavailable", async () => {
    const unavailableApp = await buildApp({
      readinessProbes: [{ name: "database", check: async () => "unavailable" }],
    });

    const response = await unavailableApp.inject({ method: "GET", url: "/ready" });
    await unavailableApp.close();

    assert.equal(response.statusCode, 503);
    assert.deepEqual(response.json(), {
      status: "not-ready",
      checks: { api: "ok", database: "unavailable" },
    });
  });

  it("identifies EL Råger transparently as AI", async () => {
    const response = await app.inject({ method: "GET", url: "/api/v1/consultant" });
    const body = response.json();

    assert.equal(response.statusCode, 200);
    assert.equal(body.name, "EL Råger");
    assert.equal(body.nature, "ai");
    assert.match(body.disclosure, /AI system/);
  });

  it("exposes the six approved consulting workflows", async () => {
    const response = await app.inject({ method: "GET", url: "/api/v1/workflows" });
    const body = response.json();

    assert.equal(response.statusCode, 200);
    assert.equal(body.items.length, 6);
    assert.ok(body.items.every((item: { exitCriterion?: string }) => item.exitCriterion));
  });

  it("returns a problem response for an unknown workflow", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/workflows/not-a-workflow",
    });

    assert.equal(response.statusCode, 404);
    assert.equal(response.json().title, "Workflow not found");
  });

  it("creates and stores a structured consultation", async () => {
    const repository = new InMemoryConsultationRepository();
    const consultationApp = await buildApp({ consultationRepository: repository });
    const response = await consultationApp.inject({
      method: "POST",
      url: "/api/v1/consultations",
      payload: {
        workflowId: "architecture-discovery",
        context: "Vi skal samle butikk og netthandel på en modernisert plattform.",
        aiAcknowledged: true,
      },
    });
    await consultationApp.close();

    assert.equal(response.statusCode, 201);
    assert.equal(response.json().workflowId, "architecture-discovery");
    assert.ok(response.json().answer.assumptions.length > 0);
    assert.equal(repository.items.length, 1);
    assert.equal(repository.items[0]?.principal.organizationId, "00000000-0000-4000-8000-000000000001");
  });

  it("requires explicit AI acknowledgement", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/consultations",
      payload: {
        workflowId: "architecture-discovery",
        context: "Vi skal samle butikk og netthandel på en modernisert plattform.",
        aiAcknowledged: false,
      },
    });

    assert.equal(response.statusCode, 400);
  });

  it("does not accept tenant identity from the browser", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/consultations",
      payload: {
        workflowId: "architecture-discovery",
        context: "Vi skal samle butikk og netthandel på en modernisert plattform.",
        aiAcknowledged: true,
        organizationId: "00000000-0000-4000-8000-000000000999",
      },
    });

    assert.equal(response.statusCode, 400);
  });

  it("keeps OpenAI responses private and sends only a pseudonymous safety identifier", async () => {
    let request: Record<string, unknown> | undefined;
    const provider = new OpenAIResponsesProvider("unused-test-key", "test-model", {
      responses: {
        create: async (input) => {
          request = input;
          return {
            id: "response-test",
            output_text: JSON.stringify({
              summary: "Kort vurdering",
              analysis: ["Analyse"],
              assumptions: ["Antakelse"],
              risks: ["Risiko"],
              nextSteps: ["Neste steg"],
              humanReview: "Anbefalt",
            }),
          };
        },
      },
    });

    const result = await provider.generateConsultation({
      workflowName: "Architecture discovery",
      workflowPurpose: "Frame the decision",
      context: "Retail platform context without personal data",
      humanReview: "recommended",
      safetyIdentifier: "hashed-subject",
    });

    assert.equal(request?.store, false);
    assert.equal(request?.safety_identifier, "hashed-subject");
    assert.equal(result.responseId, "response-test");
  });

  it("publishes an OpenAPI contract for every public API route", async () => {
    const response = await app.inject({ method: "GET", url: "/documentation/json" });
    const body = response.json();

    assert.equal(response.statusCode, 200);
    assert.equal(body.info.title, "EL Råger API");
    assert.ok(body.paths["/health"]);
    assert.ok(body.paths["/ready"]);
    assert.ok(body.paths["/api/v1/consultant"]);
    assert.ok(body.paths["/api/v1/workflows"]);
    assert.ok(body.paths["/api/v1/workflows/{workflowId}"]);
    assert.ok(body.paths["/api/v1/consultations"]);
  });
});

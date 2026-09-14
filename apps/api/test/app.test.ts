import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";

import type { FastifyInstance } from "fastify";

import { buildApp } from "../src/app.js";

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
  });
});

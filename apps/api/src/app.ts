import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import Fastify, { type FastifyInstance } from "fastify";

import { consultantProfile } from "./domain/consultant-profile.js";
import { consultingWorkflows, getWorkflow } from "./domain/workflows.js";

export interface BuildAppOptions {
  logger?: boolean;
}

export async function buildApp(options: BuildAppOptions = {}): Promise<FastifyInstance> {
  const app = Fastify({ logger: options.logger ?? false });

  await app.register(swagger, {
    openapi: {
      info: {
        title: "EL Råger API",
        description:
          "Versioned API for Value Retail Consulting's digital retail architecture consultant.",
        version: "0.1.0",
      },
      tags: [
        { name: "system", description: "Runtime health and readiness" },
        { name: "consultant", description: "EL Råger's transparent public identity" },
        { name: "workflows", description: "Approved consulting workflow contracts" },
      ],
    },
  });

  await app.register(swaggerUi, {
    routePrefix: "/documentation",
    staticCSP: true,
  });

  app.get(
    "/health",
    {
      schema: {
        summary: "Report process health",
        tags: ["system"],
        response: {
          200: {
            type: "object",
            additionalProperties: false,
            required: ["status"],
            properties: { status: { type: "string", const: "ok" } },
          },
        },
      },
    },
    async () => ({ status: "ok" }),
  );

  app.get(
    "/ready",
    {
      schema: {
        summary: "Report dependency readiness",
        tags: ["system"],
        response: {
          200: {
            type: "object",
            additionalProperties: false,
            required: ["status", "checks"],
            properties: {
              status: { type: "string", const: "ready" },
              checks: {
                type: "object",
                additionalProperties: { type: "string" },
              },
            },
          },
        },
      },
    },
    async (_request, reply) => {
      return reply.code(200).send({ status: "ready", checks: { api: "ok" } });
    },
  );

  app.get(
    "/api/v1/consultant",
    {
      schema: {
        summary: "Get EL Råger's public consultant profile",
        tags: ["consultant"],
        response: {
          200: {
            type: "object",
            additionalProperties: false,
            required: [
              "id",
              "name",
              "role",
              "organization",
              "nature",
              "disclosure",
              "languages",
              "expertise",
            ],
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              role: { type: "string" },
              organization: { type: "string" },
              nature: { type: "string", const: "ai" },
              disclosure: { type: "string" },
              languages: { type: "array", items: { type: "string" } },
              expertise: { type: "array", items: { type: "string" } },
            },
          },
        },
      },
    },
    async () => consultantProfile,
  );

  const workflowSchema = {
    type: "object",
    additionalProperties: false,
    required: [
      "id",
      "name",
      "purpose",
      "minimumInputs",
      "outputs",
      "exitCriterion",
      "humanReview",
    ],
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      purpose: { type: "string" },
      minimumInputs: { type: "array", items: { type: "string" } },
      outputs: { type: "array", items: { type: "string" } },
      exitCriterion: { type: "string" },
      humanReview: { type: "string", enum: ["optional", "recommended", "required"] },
    },
  } as const;

  app.get(
    "/api/v1/workflows",
    {
      schema: {
        summary: "List approved consulting workflows",
        tags: ["workflows"],
        response: {
          200: {
            type: "object",
            additionalProperties: false,
            required: ["items"],
            properties: {
              items: { type: "array", items: workflowSchema },
            },
          },
        },
      },
    },
    async () => ({ items: consultingWorkflows }),
  );

  app.get<{ Params: { workflowId: string } }>(
    "/api/v1/workflows/:workflowId",
    {
      schema: {
        summary: "Get one consulting workflow",
        tags: ["workflows"],
        params: {
          type: "object",
          additionalProperties: false,
          required: ["workflowId"],
          properties: { workflowId: { type: "string" } },
        },
        response: {
          200: workflowSchema,
          404: {
            type: "object",
            additionalProperties: false,
            required: ["type", "title", "status", "detail"],
            properties: {
              type: { type: "string", format: "uri" },
              title: { type: "string" },
              status: { type: "integer", const: 404 },
              detail: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const workflow = getWorkflow(request.params.workflowId);

      if (!workflow) {
        return reply.code(404).send({
          type: "https://el-rager.no/problems/workflow-not-found",
          title: "Workflow not found",
          status: 404,
          detail: `No consulting workflow exists with id '${request.params.workflowId}'.`,
        });
      }

      return workflow;
    },
  );

  return app;
}

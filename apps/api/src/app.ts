import Fastify, { type FastifyInstance } from "fastify";

import { consultantProfile } from "./domain/consultant-profile.js";
import { consultingWorkflows, getWorkflow } from "./domain/workflows.js";

export interface BuildAppOptions {
  logger?: boolean;
}

export function buildApp(options: BuildAppOptions = {}): FastifyInstance {
  const app = Fastify({ logger: options.logger ?? false });

  app.get("/health", async () => ({ status: "ok" }));

  app.get("/ready", async (_request, reply) => {
    return reply.code(200).send({ status: "ready", checks: { api: "ok" } });
  });

  app.get("/api/v1/consultant", async () => consultantProfile);

  app.get("/api/v1/workflows", async () => ({ items: consultingWorkflows }));

  app.get<{ Params: { workflowId: string } }>(
    "/api/v1/workflows/:workflowId",
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

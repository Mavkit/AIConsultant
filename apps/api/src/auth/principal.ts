import { createHash } from "node:crypto";

export interface Principal {
  organizationId: string;
  workspaceId: string;
  subject: string;
  safetyIdentifier: string;
}

export function createPilotPrincipal(environment: NodeJS.ProcessEnv = process.env): Principal {
  const mode = environment.AUTH_MODE ?? (environment.NODE_ENV === "production" ? "unconfigured" : "development");
  if (mode !== "development") {
    throw new Error("Only AUTH_MODE=development is implemented; configure a verified identity adapter before production");
  }
  const subject = environment.DEVELOPMENT_SUBJECT ?? "local-development";
  return {
    organizationId: environment.DEVELOPMENT_ORGANIZATION_ID ?? "00000000-0000-4000-8000-000000000001",
    workspaceId: environment.DEVELOPMENT_WORKSPACE_ID ?? "00000000-0000-4000-8000-000000000101",
    subject,
    safetyIdentifier: createHash("sha256").update(subject).digest("hex"),
  };
}

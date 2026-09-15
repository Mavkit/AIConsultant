import pg from "pg";

export type ReadinessState = "ok" | "not-configured" | "unavailable";

export interface ReadinessProbe {
  name: string;
  check: () => Promise<ReadinessState>;
  close?: () => Promise<void>;
}

export function createDatabaseReadinessProbe(
  environment: NodeJS.ProcessEnv = process.env,
): ReadinessProbe {
  const configured = Boolean(environment.DATABASE_URL || environment.PGHOST);

  if (!configured) {
    return {
      name: "database",
      check: async () => "not-configured",
    };
  }

  const pool = new pg.Pool({
    connectionString: environment.DATABASE_URL,
    host: environment.DATABASE_URL ? undefined : environment.PGHOST,
    port: environment.PGPORT ? Number.parseInt(environment.PGPORT, 10) : undefined,
    database: environment.PGDATABASE,
    user: environment.PGUSER,
    password: environment.PGPASSWORD,
    application_name: "el-rager-api-readiness",
    connectionTimeoutMillis: 2_000,
    idleTimeoutMillis: 10_000,
    max: 2,
  });

  return {
    name: "database",
    check: async () => {
      try {
        await pool.query("SELECT 1");
        return "ok";
      } catch {
        return "unavailable";
      }
    },
    close: async () => pool.end(),
  };
}

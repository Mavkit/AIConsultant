import { cp, mkdir } from "node:fs/promises";

const target = new URL("../.next/standalone/apps/web/.next/static/", import.meta.url);
await mkdir(target, { recursive: true });
await cp(new URL("../.next/static/", import.meta.url), target, { recursive: true });

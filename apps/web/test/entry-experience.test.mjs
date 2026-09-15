import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const layoutSource = await readFile(new URL("../src/app/layout.tsx", import.meta.url), "utf8");

test("entry experience identifies EL Råger as AI", () => {
  assert.match(pageSource, /EL Råger er en AI-rådgiver/);
  assert.match(pageSource, /kvalitetssikres av kvalifiserte fagpersoner/);
});

test("consultation intake requires explicit AI acknowledgement", () => {
  assert.match(pageSource, /name="aiAcknowledged" required/);
  assert.match(pageSource, /ikke dele sensitive personopplysninger/);
});

test("consultation intake calls the versioned API and renders a structured result", () => {
  assert.match(pageSource, /fetch\("\/api\/v1\/consultations"/);
  assert.match(pageSource, /answer\.assumptions/);
  assert.match(pageSource, /answer\.nextSteps/);
});

test("page is localized and exposes a main heading", () => {
  assert.match(layoutSource, /<html lang="no">/);
  assert.match(pageSource, /<h1>/);
});

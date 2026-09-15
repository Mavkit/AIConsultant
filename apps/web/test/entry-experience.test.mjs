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
  assert.match(pageSource, /type="checkbox" required/);
  assert.match(pageSource, /ikke dele sensitive personopplysninger/);
});

test("page is localized and exposes a main heading", () => {
  assert.match(layoutSource, /<html lang="no">/);
  assert.match(pageSource, /<h1>/);
});

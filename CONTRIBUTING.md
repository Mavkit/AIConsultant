# Contributing to EL Råger

## Working agreement

All work starts from a GitHub issue in the [AIConsultant Product Backlog](https://github.com/users/Mavkit/projects/1). Keep the issue's objective and acceptance criteria current as understanding changes.

1. Move the selected issue to **Ready**, then **In progress** when work begins.
2. Create a focused branch from `main`.
3. Keep architecture decisions and customer-facing behavior documented with the code.
4. Run the required checks locally.
5. Open a pull request that links the issue and explains evidence, assumptions, risks, and validation.
6. Move the item to **In review**; merge only after required checks and review pass.
7. Confirm acceptance criteria, then move the item to **Done** and close the issue.

## Local checks

```bash
npm ci
npm run check
npm test
npm run build
```

## Architecture changes

Create or update an ADR under `docs/architecture/decisions/` when a change:

- Alters a system, container, data, integration, tenant, or trust boundary.
- Introduces a new infrastructure or model-provider dependency.
- Changes a public API or canonical artifact format.
- Creates a choice that will be expensive to reverse.

ADRs begin as **Proposed**. A reviewer with the appropriate product or technical accountability changes them to **Accepted**.

## AI behavior changes

Changes to prompts, retrieval, workflow policy, tools, model routing, or artifacts must include:

- A linked product or consulting requirement.
- Evaluation scenarios for expected and unsafe behavior.
- A description of evidence and source-governance impact.
- Cost and latency considerations.
- Human review or escalation impact.

## Documentation expectations

- Prefer concise Markdown stored beside the relevant domain.
- Link repository documentation from the issue and pull request.
- Do not duplicate authoritative rules across several files; link to the source.
- Use diagrams when boundaries or sequences are otherwise difficult to understand.
- Mark drafts and proposed decisions clearly.

## Security and customer data

- Never commit secrets, production data, customer documents, or identifying conversation content.
- Use synthetic fixtures in tests and examples.
- Treat retrieved documents and model output as untrusted input.
- Report suspected vulnerabilities privately as described in [SECURITY.md](SECURITY.md).

# EL Råger — AI Retail Architecture Consultant

EL Råger is Value Retail Consulting's digital consultant: an AI-assisted enterprise and solution architect focused on the retail domain.

The product is intended to give customers affordable, structured access to architecture guidance while making assumptions, evidence, risks, and human escalation explicit. It will be delivered as a secure, multi-tenant web application, be reachable from the Value Retail website, and run in Docker-based environments.

> EL Råger is an AI system, not a human consultant. High-impact recommendations must be reviewed by qualified people before implementation or commitment.

## Milestone 1 foundation

- [Product vision and MVP](docs/product/vision-and-mvp.md)
- [EL Råger persona and operating model](docs/product/el-rager-operating-model.md)
- [Retail architecture competency model](docs/domain/retail-architecture-competency-model.md)
- [Consulting workflows and deliverables](docs/workflows/consulting-workflows.md)
- [Platform architecture](docs/architecture/platform-architecture.md)
- [Architecture decision records](docs/architecture/decisions/README.md)
- [Definition of done](docs/governance/definition-of-done.md)

## Guiding principles

1. Business value before technology.
2. Evidence and assumptions are visible.
3. Advice is specific to the customer's context.
4. Customer data stays isolated and governed.
5. Humans retain accountability for consequential decisions.
6. The platform remains portable, observable, and cost-aware.

## Repository status

The repository contains the Milestone 1 product and architecture baseline plus an executable API foundation. The API publishes EL Råger's transparent consultant profile, health/readiness status, and the approved consulting workflow catalog.

## Local development

Requires Node.js 24 or later.

```bash
npm install
npm run check
npm test
npm run dev:api
```

The development API listens on `http://localhost:3001` by default.

| Endpoint | Purpose |
| --- | --- |
| `GET /health` | Process health |
| `GET /ready` | Dependency readiness |
| `GET /api/v1/consultant` | EL Råger identity, disclosure, languages, and expertise |
| `GET /api/v1/workflows` | Approved consulting workflow catalog |
| `GET /api/v1/workflows/:workflowId` | A single workflow contract |
| `GET /documentation` | Interactive OpenAPI documentation |

See [CONTRIBUTING.md](CONTRIBUTING.md) for the development workflow and [the delivery roadmap](docs/ROADMAP.md) for milestone scope.

## Docker

```bash
docker compose up --build
```

The customer entry experience is then available at `http://localhost:3000`, with the API at `http://localhost:3001`. Compose provisions PostgreSQL, applies versioned migrations and repeatable non-customer pilot seed data, and starts the applications only after dependency readiness. The web application proxies browser API calls through its own origin and keeps the internal API address server-side. See the [Docker operations guide](docs/operations/docker.md) for lifecycle, configuration, verification, and troubleshooting.

## Source context

The initial scope is aligned with Value Retail Consulting's published expertise in strategy, enterprise architecture, solution architecture, procurement, program and IT leadership, vendor management, business development, and change leadership:

- <https://valueretail.no/ekspertise>
- <https://valueretail.no/menneskene>

# ADR 0001: Modular service architecture

- Status: Proposed
- Date: 2026-09-14
- Decision owner: Technical leadership

## Context

EL Råger needs a polished web experience, strong AI/document tooling, background processing, and Docker portability. The initial team and product scope favor simple operations, but tenant isolation and model access need a strict server boundary. The initial development environment already provides a current Node.js runtime, while Python is not part of the baseline environment.

## Decision drivers

- Fast MVP delivery by a small team.
- Strong typing at external boundaries.
- One language and contract model across the initial application.
- Independent scaling of interactive and background work.
- Avoid premature microservice complexity.

## Options considered

1. TypeScript workspace with Next.js web, Fastify API, and Node.js worker.
2. Next.js web plus a modular FastAPI backend and Python worker.
3. Fine-grained microservices from the start.

## Decision

Use a TypeScript workspace with a Next.js web application, modular Fastify API, and Node.js background worker. Deploy interactive API and background worker as separate containers while sharing domain contracts through workspace packages. Organize business logic as explicit modules rather than network services.

## Consequences

Positive:

- The initial product uses one language, validation model, and toolchain.
- Interactive and background workloads can scale independently.
- Module boundaries can later become services if evidence supports it.

Negative:

- Some specialized document or AI tooling may later require a Python sidecar or service.
- Shared packages must remain dependency-light and cannot bypass service boundaries.

## Revisit triggers

- Required AI/document capabilities are materially better served by another runtime.
- A module needs independent security, ownership, availability, or scaling.
- Contract coordination becomes a material delivery bottleneck.

# ADR 0001: Modular service architecture

- Status: Proposed
- Date: 2026-09-14
- Decision owner: Technical leadership

## Context

EL Råger needs a polished web experience, strong AI/document tooling, background processing, and Docker portability. The initial team and product scope favor simple operations, but tenant isolation and model access need a strict server boundary.

## Decision drivers

- Fast MVP delivery by a small team.
- Strong typing at external boundaries.
- Mature AI/document processing ecosystem.
- Independent scaling of interactive and background work.
- Avoid premature microservice complexity.

## Options considered

1. TypeScript monolith including web and API.
2. Next.js web plus a modular FastAPI backend and worker.
3. Fine-grained microservices from the start.

## Decision

Use a Next.js/TypeScript web application and a modular FastAPI/Python backend. Deploy interactive API and background worker as separate containers from the same backend codebase. Organize business logic as explicit modules rather than network services.

## Consequences

Positive:

- The web and AI workloads use ecosystems suited to their needs.
- Interactive and background workloads can scale independently.
- Module boundaries can later become services if evidence supports it.

Negative:

- Two language toolchains require contract generation and coordinated dependency management.
- Shared logic must live behind API schemas rather than duplicated packages.

## Revisit triggers

- Team capability strongly favors one language.
- A module needs independent security, ownership, availability, or scaling.
- Contract coordination becomes a material delivery bottleneck.

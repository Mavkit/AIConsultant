# ADR 0002: Model-provider abstraction

- Status: Proposed
- Date: 2026-09-14
- Decision owner: AI/platform architecture

## Context

Model quality, price, latency, privacy terms, region availability, and capabilities change independently of the product. Consulting workflows and safety rules must remain testable without live inference.

## Decision

All model and embedding access goes through an internal model gateway interface. Business workflows depend on task-oriented capabilities such as structured generation, tool execution, embeddings, and streaming—not on provider SDK types.

The gateway owns approved model configuration, budgets, retry policy, safe telemetry, prompt/version identifiers, and test doubles. Provider-specific features may be used behind capability checks but cannot leak into core domain contracts.

## Consequences

- Providers and models can be evaluated or replaced with controlled impact.
- Tests can use deterministic fixtures.
- The abstraction adds implementation work and must not collapse all providers to an unusably weak common denominator.

## Revisit triggers

- A provider-specific capability creates decisive product value.
- Abstraction maintenance costs exceed realistic portability benefits.

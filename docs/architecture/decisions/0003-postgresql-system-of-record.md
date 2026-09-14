# ADR 0003: PostgreSQL as system of record

- Status: Proposed
- Date: 2026-09-14
- Decision owner: Data architecture

## Context

The product needs transactional tenant data, structured consultation state, artifact metadata, auditability, flexible JSON, and vector retrieval. The MVP should minimize operational components while preserving future options.

## Decision

Use PostgreSQL as the authoritative operational store and pgvector for the initial embedding index. Store original documents and large generated files in S3-compatible object storage. Redis-compatible storage is limited to ephemeral caching, rate limiting, and job coordination.

## Consequences

- One durable database covers most MVP needs with strong transactions and mature operations.
- Tenant filters can be reinforced with database policies.
- Very large or specialized retrieval workloads may eventually require a dedicated search/vector service.

## Revisit triggers

- Retrieval scale or features exceed measured PostgreSQL capabilities.
- Regional isolation or availability requirements require a different topology.
- Analytical workloads interfere with transactional performance.

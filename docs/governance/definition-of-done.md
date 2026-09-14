# Definition of done

This baseline applies to every product increment. Individual issues may add stricter acceptance criteria.

## Product and consulting quality

- The customer outcome and measurable acceptance criteria are clear.
- Norwegian and English behavior is considered where user-facing.
- Facts, sources, assumptions, and recommendations remain distinguishable.
- Human escalation and approval points are implemented where applicable.
- User-facing AI identity and limitations are not obscured.

## Architecture and implementation

- Relevant architecture diagrams and ADRs are updated.
- Tenant, authorization, privacy, and trust boundaries are reviewed.
- External contracts are versioned and documented.
- Failure, retry, idempotency, and recovery behavior are defined.
- Docker/local development impact is documented.

## Verification

- Automated tests cover the change at the appropriate level.
- Retail scenario evaluations are added for changed AI behavior.
- Accessibility checks cover user-facing flows.
- Security and dependency checks pass.
- Observability measures outcome, failure, latency, and cost without unsafe content capture.

## Delivery

- Documentation and runbooks are updated.
- Database and configuration changes are backward-compatible or have a migration/rollback plan.
- No secrets or customer data are committed.
- The change has been reviewed against its issue acceptance criteria.

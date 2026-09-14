# Delivery roadmap

The GitHub [Product Backlog](https://github.com/users/Mavkit/projects/1) is the live planning system. This document records stable milestone intent and repository evidence; it does not duplicate day-to-day status.

## M1 — Foundation & Architecture

[GitHub milestone](https://github.com/Mavkit/AIConsultant/milestone/1)

Outcome: establish an approved, testable product and architecture baseline.

| Issue | Repository evidence | State |
| --- | --- | --- |
| [#1 Product vision and MVP](https://github.com/Mavkit/AIConsultant/issues/1) | [`docs/product/vision-and-mvp.md`](product/vision-and-mvp.md) | Proposed for review |
| [#2 Persona and operating model](https://github.com/Mavkit/AIConsultant/issues/2) | [`docs/product/el-rager-operating-model.md`](product/el-rager-operating-model.md), consultant API | Proposed for review |
| [#3 Retail competency model](https://github.com/Mavkit/AIConsultant/issues/3) | [`docs/domain/retail-architecture-competency-model.md`](domain/retail-architecture-competency-model.md) | Proposed for review |
| [#4 Consulting workflows](https://github.com/Mavkit/AIConsultant/issues/4) | [`docs/workflows/consulting-workflows.md`](workflows/consulting-workflows.md), workflow API | Proposed for review |
| [#5 Platform architecture and ADRs](https://github.com/Mavkit/AIConsultant/issues/5) | [`docs/architecture/platform-architecture.md`](architecture/platform-architecture.md), [`docs/architecture/decisions/`](architecture/decisions/) | Proposed for review |

M1 remains open until accountable reviewers accept the product baseline and proposed ADRs. Executable contracts are present to make review concrete; they do not imply production readiness.

## M2 — MVP Customer Pilot

[GitHub milestone](https://github.com/Mavkit/AIConsultant/milestone/2)

Outcome: deliver a secure, branded, Docker-based customer pilot with governed knowledge and human escalation.

Scope: issues #6–#9 and #11.

## M3 — Commercial Launch

[GitHub milestone](https://github.com/Mavkit/AIConsultant/milestone/3)

Outcome: add paid entitlements, quality gates, observability, cost controls, and production launch readiness.

Scope: issues #10 and #12.

## Decision gates

1. **M1 review:** approve MVP, persona, workflow, domain, and architecture baselines.
2. **Pilot readiness:** security/privacy review, tenant-isolation evidence, evaluation threshold, operational readiness, and brand approval.
3. **Commercial readiness:** pricing/entitlements, payment-provider controls, support model, production SLOs, and rollback verification.

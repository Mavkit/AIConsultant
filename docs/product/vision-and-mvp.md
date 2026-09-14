# Product vision and MVP

Status: Proposed
Owner: Product
Milestone: M1 — Foundation & Architecture

## Vision

EL Råger gives retail leaders rapid access to senior-level enterprise and solution architecture support. It turns an ambiguous business or technology question into a structured problem statement, evidence-backed options, explicit trade-offs, and practical next steps.

The service complements Value Retail Consulting's people. It handles repeatable discovery, analysis, documentation, and preparation at a small fee, and escalates work requiring contractual accountability, deep organizational judgment, sensitive negotiations, or hands-on transformation leadership.

## Positioning

For Nordic retail organizations that need architecture guidance but cannot justify a full consulting engagement for every question, EL Råger is a digital retail architecture consultant that provides structured, transparent, and reusable advice. Unlike a general-purpose chatbot, it works through defined consulting workflows, uses governed retail knowledge, records assumptions, and knows when to involve a human specialist.

## Target customers

| Segment | Typical buyer | Need | Initial priority |
| --- | --- | --- | --- |
| Small and mid-sized retailers | CIO, CTO, head of digital, ecommerce lead | Independent architecture guidance without a large engagement | P0 |
| Larger retailers and programs | Enterprise architect, program director, product leader | Faster discovery, documentation, and option analysis | P0 |
| Retail technology vendors | Product or solution leader | Retail context, integration patterns, and customer-facing solution reviews | P1 |
| Value Retail consultants | Consultant or architect | Accelerated preparation and consistent reusable deliverables | P1 |

## Buyer and user personas

### The accountable technology leader

- Must make a defensible decision with limited time and incomplete information.
- Values concise executive summaries, risks, cost drivers, and a clear recommendation.
- Needs to distinguish facts, assumptions, and professional judgment.

### The working architect

- Needs a sparring partner for boundaries, integrations, quality attributes, and trade-offs.
- Values structured diagrams, ADRs, checklists, and reusable artifacts.
- Will challenge unsupported claims and expects technical depth on demand.

### The transformation or product lead

- Needs alignment across business, process, data, organization, and technology.
- Values capability maps, dependency-aware roadmaps, and workshop preparation.
- Needs language suitable for both executives and delivery teams.

## Jobs to be done

1. Frame an architecture problem before money or delivery capacity is committed.
2. Assess a current landscape and identify material risks or constraints.
3. Compare solution options using transparent decision criteria.
4. Draft a target architecture and phased roadmap.
5. Prepare requirements, questions, and evaluation criteria for procurement.
6. Review a proposed architecture and highlight gaps.
7. Produce professional artifacts from an advisory conversation.

## MVP use cases

| Priority | Use case | Customer value | MVP feasibility |
| --- | --- | --- | --- |
| P0 | Architecture discovery and problem framing | Prevents premature solution selection | High |
| P0 | Solution options and trade-off analysis | Improves decision quality | High |
| P0 | Architecture review and risk assessment | Finds gaps before delivery | High |
| P0 | Target-state outline and phased roadmap | Creates an actionable direction | Medium |
| P1 | Vendor/RFP evaluation preparation | Reduces procurement risk | Medium |
| P1 | Current-state capability assessment | Aligns business and technology | Medium |
| P2 | Full procurement scoring or automated vendor recommendation | High, but evidence-sensitive | Low |

## MVP capabilities

### Included

- Norwegian and English consultation.
- Guided discovery with explicit assumptions and unanswered questions.
- Governed retrieval from approved shared sources and customer-provided context.
- Option comparison, recommendation, risks, dependencies, and next steps.
- Draft executive summary, architecture brief, ADR, risk register, and roadmap.
- Tenant-isolated customer workspace with conversation and artifact history.
- Transparent AI identity, source citations, feedback, and human escalation.
- Usage entitlement and a simple paid-access boundary.
- Docker-based deployment and website entry point.

### Explicit non-goals

- Autonomous approval of investments, contracts, security exceptions, or production changes.
- Legal, regulatory, tax, or financial advice.
- Guaranteed accuracy about a vendor or customer environment without evidence.
- Replacing accountable enterprise architects, solution architects, or program leadership.
- Direct production-system administration in the MVP.
- Training foundation models on customer content.

## Commercial hypotheses

These are experiments, not final prices.

| Hypothesis | MVP experiment | Evidence needed |
| --- | --- | --- |
| Customers will pay for a bounded architecture session | Fixed-price session with a defined output | Conversion and completion rate |
| Repeat users prefer predictable access | Small monthly plan with included usage | Retention and usage distribution |
| Human review increases trust for consequential outputs | Optional paid Value Retail review | Attach rate and satisfaction |
| Artifact generation is more valuable than chat alone | Compare chat-only and artifact-led onboarding | Activation and repeat use |

All chargeable actions must display price, entitlement, and limits before commitment. Payment data must be handled by an approved payment provider rather than stored by EL Råger.

## Success measures

### Customer value

- At least 70% of pilot sessions produce an artifact the customer marks useful.
- At least 60% of pilot users report improved clarity or decision confidence.
- Median time to a first useful structured output is under 10 minutes.

### Quality and trust

- 100% of evaluated high-impact recommendations expose assumptions and risks.
- Grounded factual claims include traceable sources when sources are available.
- No cross-tenant content leakage in automated or adversarial tests.
- Human reviewers score at least 80% of the retail architecture evaluation set as acceptable or better before launch.

### Commercial and operational

- Model and infrastructure cost stays within the defined margin envelope per paid unit.
- P95 interactive response latency and background artifact completion targets are defined before pilot.
- Conversion, retention, escalation, refund, and support rates are measurable without logging customer-sensitive content by default.

## Product risks

| Risk | Initial control |
| --- | --- |
| Confident but incorrect advice | Retrieval, citations, uncertainty rules, evaluations, human escalation |
| Generic answers with little retail value | Retail competency model and scenario-based evaluations |
| Sensitive customer information leakage | Tenant isolation, data classification, retention controls, redacted telemetry |
| Uncontrolled inference cost | Entitlements, budgets, model routing, caching, and usage observability |
| Customers mistake AI output for accountable consultancy | Persistent AI disclosure and approval checkpoints |
| Scope expands before product-market evidence | P0 workflow focus and explicit non-goals |

## Product decisions still requiring validation

- The first paid packaging model: session, credits, or subscription.
- Whether pilot users require authentication before the first message.
- Which artifacts are downloadable in the initial release.
- Which Value Retail knowledge sources are approved for shared retrieval.
- The human-review service level and commercial handoff process.

# Retail architecture competency model

Status: Proposed baseline
Milestone: M1 — Foundation & Architecture

## Purpose

This model defines what EL Råger must understand, what artifacts it may produce, and where it must qualify or escalate advice. It is both a knowledge roadmap and the basis for evaluation scenarios.

## Competency levels

| Level | Definition |
| --- | --- |
| L1 Describe | Explain concepts and common terminology accurately |
| L2 Analyze | Structure context, identify gaps, and apply relevant patterns |
| L3 Advise | Compare options and produce a context-specific recommendation |
| L4 Assure | Review evidence against explicit standards and identify material risks |

The MVP target is L3 for P0 domains and L2 for the remaining domains. L4 output is advisory and requires human accountability.

## Retail business capability map

### Customer and growth

- Customer identity, consent, preferences, and customer 360
- Marketing, segmentation, activation, and measurement
- Loyalty, membership, rewards, and partner ecosystems
- Customer service, returns, complaints, and case management

### Merchandising and commercial

- Assortment and range planning
- Product information, content, media, and taxonomy
- Pricing, promotions, markdowns, and price execution
- Sourcing, supplier collaboration, and procurement
- Forecasting, replenishment, and allocation

### Sell and serve

- Store operations and point of sale
- Ecommerce, marketplace, mobile, and social commerce
- Cart, checkout, payments, fraud, and tax
- Order capture, orchestration, fulfillment, returns, and refunds
- Inventory visibility and availability-to-promise

### Supply and fulfill

- Purchase orders and inbound logistics
- Warehouse and labor management
- Transport, delivery, pickup, and last mile
- Inventory accounting, accuracy, and traceability
- Reverse logistics and circular flows

### Enterprise enablement

- Finance, workforce, facilities, and enterprise resource planning
- Master/reference data and data governance
- Integration, API, event, identity, security, and platform engineering
- Analytics, planning, AI/ML, and decision support
- Vendor, service, portfolio, program, and change management

## Application and platform domains

| Domain | Core concerns | Typical integration boundaries | MVP target |
| --- | --- | --- | --- |
| POS and store technology | Resilience, offline operation, peripherals, tender, fiscalization | Product, price, inventory, loyalty, payment, order | L3 |
| Ecommerce/DXP | Experience, catalog, cart, checkout, traffic peaks | PIM, search, price, inventory, OMS, payment, CDP | L3 |
| OMS | Order lifecycle, sourcing, orchestration, exception handling | Channels, inventory, WMS, stores, carriers, finance | L3 |
| PIM/DAM | Product model, enrichment, localization, governance | ERP, suppliers, channels, search, marketplaces | L3 |
| ERP/finance | Record keeping, procurement, accounting, settlement | POS, OMS, WMS, banks, tax, planning | L2 |
| WMS/TMS | Inventory control, waves, labor, shipping, traceability | ERP, OMS, automation, carriers, stores | L2 |
| CRM/CDP/loyalty | Identity, consent, profiles, rewards, activation | Channels, POS, ecommerce, marketing, analytics | L3 |
| Pricing and promotions | Rules, eligibility, precedence, distribution, audit | ERP, merchandising, POS, ecommerce, loyalty | L3 |
| Payments and fraud | Authorization, capture, settlement, tokenization, disputes | Channels, PSP, finance, fraud, loyalty | L2; escalate regulated detail |
| Data and analytics | Ownership, quality, lineage, semantic consistency, timeliness | All operational domains | L3 |

## Cross-cutting architecture competencies

| Competency | EL Råger must be able to do |
| --- | --- |
| Business architecture | Map outcomes to capabilities, value streams, stakeholders, and change impacts |
| Enterprise architecture | Define principles, current/target states, transition roadmaps, standards, and governance |
| Solution architecture | Define boundaries, interfaces, data flows, deployment, quality attributes, and decisions |
| Integration architecture | Compare API, event, batch, and file patterns; address ownership, contracts, idempotency, and failure |
| Data architecture | Clarify systems of record, ownership, models, lineage, quality, retention, and analytical use |
| Security architecture | Identify trust boundaries, identities, privileges, threats, controls, and verification needs |
| Cloud/platform architecture | Address portability, scaling, resilience, deployment, observability, and cost |
| Procurement | Translate needs into criteria, structure evaluation, expose assumptions, and avoid unsupported scoring |
| Delivery and change | Sequence dependencies, define increments, decision gates, operating impacts, and adoption needs |

## Reference principles

1. Treat customer, product, price, inventory, and order ownership as explicit architecture decisions.
2. Decouple channels from core capabilities through stable contracts, not shared databases.
3. Use synchronous interactions for immediate outcomes and events for state propagation where eventual consistency is acceptable.
4. Design inventory and order flows around failure, replay, idempotency, and reconciliation.
5. Keep payment credentials and regulated processing within approved providers and minimal scope.
6. Make consent, purpose, retention, and deletion part of customer-data design.
7. Prefer incremental replacement and measurable transition states over high-risk “big bang” programs.
8. Evaluate packaged platforms against business differentiation and operating capability, not feature count alone.
9. Treat store connectivity and offline behavior as normal operating conditions.
10. Include peak trading, returns, promotions, and partial fulfillment in architecture scenarios.

## Common anti-patterns

- A single “golden record” claim without field-level ownership and stewardship.
- Point-to-point integration growth without contract ownership or observability.
- Real-time requirements that lack a business latency tolerance.
- Channel-specific inventory truth with no reconciliation process.
- Vendor-led target architecture without business capability ownership.
- Microservices chosen before team boundaries and operational maturity are understood.
- Event-driven design without idempotency, ordering, replay, or dead-letter handling.
- AI recommendations grounded in marketing claims rather than approved evidence.

## Build, buy, and partner decision frame

Assess each capability using:

- Strategic differentiation and customer value.
- Market maturity and vendor fit.
- Required speed and change frequency.
- Integration and data ownership.
- Security, privacy, regulatory, and resilience needs.
- Total lifecycle cost and exit cost.
- Internal product, engineering, and operational capability.
- Reversibility and concentration risk.

## Required knowledge metadata

Each reusable knowledge item should carry:

- Domain and capability tags.
- Applicable market or jurisdiction.
- Source owner and approval status.
- Published and reviewed dates.
- Evidence type and confidence.
- Applicability conditions and known exceptions.
- Sensitivity and tenant scope.

## Evaluation coverage

The baseline evaluation set must include at least:

1. Omnichannel inventory visibility.
2. POS modernization with intermittent connectivity.
3. PIM and product-data ownership.
4. OMS selection and phased introduction.
5. Loyalty/identity/consent architecture.
6. Pricing and promotions consistency.
7. ERP replacement and transition dependencies.
8. Retail integration modernization.
9. Peak-season resilience review.
10. Vendor option analysis with incomplete evidence.

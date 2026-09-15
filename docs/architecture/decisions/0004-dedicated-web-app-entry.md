# ADR 0004: Dedicated web application entry

- Status: Accepted for MVP
- Date: 2026-09-14
- Decision owner: Product and web architecture

## Context

EL Råger must be reachable from ValueRetail.no but requires authenticated sessions, streaming, workspaces, billing, file handling, and an independent release lifecycle. Coupling those concerns directly to the marketing site's CMS increases security and delivery risk.

## Decision

Host EL Råger as a dedicated web application, initially on a Value Retail-controlled subdomain. ValueRetail.no provides discovery, profile, pricing, and a clear launch link. A limited embed may be added only after validating browser security policy, authentication/cookie behavior, accessibility, navigation, analytics, and mobile usability.

## Consequences

- Product deployment and security remain independent of the marketing CMS.
- Users may experience a domain transition, which must preserve brand continuity and trust.
- A future embed remains possible through a deliberately narrow integration contract.

## Implementation evidence

The first customer entry experience is implemented in `apps/web` as a responsive Next.js application. Browser API requests use a same-origin server proxy, while Docker injects the private service address through `API_INTERNAL_URL`. This establishes the subdomain-ready boundary without exposing internal service names or credentials to the browser.

## Revisit triggers

- The current website platform supports the full product securely and operational ownership is aligned.
- User research shows the domain transition materially reduces conversion.

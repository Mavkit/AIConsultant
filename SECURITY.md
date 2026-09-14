# Security policy

## Supported versions

EL Råger is pre-release. Only the latest `main` branch is currently maintained.

## Reporting a vulnerability

Do not open a public GitHub issue for a suspected vulnerability or customer-data exposure. Contact the repository owner or Value Retail Consulting through an approved private channel and include:

- A concise description and potential impact.
- Reproduction steps using synthetic data.
- Affected component and version/commit.
- Any known mitigation.

Do not include secrets, credentials, personal data, or customer content in the report. The maintainers will acknowledge the report, establish a private coordination path, assess severity, and communicate remediation status.

## Security principles

- Tenant isolation is mandatory at application and data boundaries.
- Customer data is minimized, classified, encrypted, and retained only as required.
- Model providers receive only approved minimum context.
- Logs and traces exclude sensitive content by default.
- High-impact recommendations require explicit human accountability.

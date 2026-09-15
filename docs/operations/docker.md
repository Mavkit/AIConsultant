# Docker operations guide

Status: Initial API runtime
Related issue: [#7 Containerize the complete application with Docker](https://github.com/Mavkit/AIConsultant/issues/7)

## Purpose

The Docker baseline makes the EL Råger web application and API reproducible across development, CI, and later deployment environments. Both runtime images are multi-stage, run as the unprivileged `node` user, contain production dependencies only, and expose explicit health behavior.

## Prerequisites

- Docker Engine or Docker Desktop with Compose v2.
- Network access to the configured container registry and npm registry for the first build.
- Ports 3000 and 3001 available, or set `EL_RAGER_WEB_PORT` and `EL_RAGER_API_PORT` to other host ports.

## Build and run

```bash
docker compose up --build
```

Older installations that expose Compose as the standalone `docker-compose` executable can use that command in place of `docker compose`. Compose v2 is the supported deployment baseline.

Run in the background:

```bash
docker compose up --build --detach
```

Use another host port:

```bash
EL_RAGER_WEB_PORT=8080 EL_RAGER_API_PORT=8081 docker compose up --build
```

PowerShell:

```powershell
$env:EL_RAGER_WEB_PORT = "8080"
$env:EL_RAGER_API_PORT = "8081"
docker compose up --build
```

## Verify

```bash
docker compose ps
curl http://localhost:3000/healthz
curl http://localhost:3000/readyz
curl http://localhost:3001/health
curl http://localhost:3001/ready
```

Expected health response:

```json
{"status":"ok"}
```

The customer entry experience is available at <http://localhost:3000>. Interactive API documentation is available at <http://localhost:3001/documentation>.

The browser calls `/api/*` on the web origin. The web server forwards those requests to `API_INTERNAL_URL`, so internal addresses and future service credentials do not enter the client bundle.

## Lifecycle

Stop containers while keeping reusable state:

```bash
docker compose stop
```

Remove the Compose containers and network:

```bash
docker compose down
```

The current API baseline is stateless and defines no volumes. Later data services must use explicit named volumes or managed services with documented backup and restore behavior.

## Runtime controls

| Control | Implementation |
| --- | --- |
| Least privilege | Runtime uses the image's unprivileged `node` user |
| Immutable filesystem | Compose sets `read_only: true` |
| Temporary writes | A size-limited `/tmp` tmpfs is provided |
| Privilege escalation | `no-new-privileges:true` |
| Process lifecycle | Compose init forwards signals and reaps child processes |
| Graceful stop | 15-second stop grace period; Fastify handles termination |
| Health | Image and Compose probe `/healthz` for web and `/health` for API |
| Readiness | Web `/readyz` verifies API `/ready`; API reports its dependency checks |
| Resource limits | Compose caps each initial service at 0.5 CPU and 512 MiB |
| Secrets | No secrets are copied into the image; future secrets are injected at runtime |

## Configuration

| Variable | Default | Meaning |
| --- | --- | --- |
| `HOST` | `0.0.0.0` | Container listen address |
| `PORT` | `3001` | Container listen port |
| `NODE_ENV` | `production` | Runtime mode |
| `API_INTERNAL_URL` | `http://api:3001` | Server-only web-to-API address |
| `EL_RAGER_WEB_PORT` | `3000` | Compose web host-side published port |
| `EL_RAGER_API_PORT` | `3001` | Compose host-side published port |

Configuration is environment-based. Secret values must come from the deployment platform's secret store or a Compose secret mechanism; they must never be committed or baked into an image.

## CI behavior

CI runs type checks, tests, and application builds before building both the web and API images. A failed compile, test, dependency install, or image build blocks the workflow.

## Troubleshooting

### Port already in use

Set `EL_RAGER_API_PORT` to an unused host port. The internal container port remains 3001.

### Container is unhealthy

Inspect status and application logs:

```bash
docker compose ps
docker compose logs api
```

Confirm that web listens on `0.0.0.0:3000`, API listens on `0.0.0.0:3001`, and their health endpoints return HTTP 200 inside the containers. Web readiness returns HTTP 503 when the API is unavailable by design.

### Rebuild after dependency changes

```bash
docker compose build --no-cache api
docker compose up api
```

Use no-cache builds only for diagnosis; normal builds should reuse deterministic lockfile layers.

## Production gaps

This baseline intentionally does not select a production orchestrator. Before pilot deployment, document and verify:

- TLS ingress and trusted proxy behavior.
- Central secret injection and rotation.
- Resource requests and limits calibrated from pilot measurements.
- Registry provenance, vulnerability scanning, and image signing.
- Log/trace export without sensitive content.
- Deployment rollout and rollback.
- Database, object storage, queue, migrations, backup, and restore.

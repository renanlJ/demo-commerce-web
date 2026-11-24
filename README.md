# demo-commerce-web

Storefront frontend for the **Demo Commerce Platform** — a polyglot
reference workload for devex.io (Backstage-based IDP). Displays the
product catalog, details, reviews and ratings; talks exclusively to
`demo-product-api`.

- **Language**: TypeScript
- **Framework**: React 19 + Vite 6, React Router, Vitest + React Testing
  Library + msw
- **Role**: frontend — never calls the leaf services directly; in
  production nginx proxies `/api/*` to `demo-product-api`
- **Part of**: `system: demo-commerce` / `domain: commerce` (see `catalog-info.yaml`)

## Develop

```bash
npm ci
npm run dev          # Vite dev server on :5173, /api proxied to :3000
npm test             # vitest + coverage gate
npm run lint format  # eslint / prettier --check
npm run build        # tsc -b && vite build → dist/
```

The dev proxy targets `localhost:3000`; run `demo-product-api` locally
(or the whole compose stack) for live data. Unit tests mock the API
with msw.

## Configuration

| Env var | Where | Description |
| ------- | ----- | ----------- |
| `PRODUCT_API_URL` | container | nginx upstream for `/api/` (default `http://demo-product-api:3000`) |

No build-time API URL — the browser always calls same-origin `/api/*`.

## Docker

```bash
docker build -t demo-commerce-web:0.1.0 .
docker run -p 8080:8080 -e PRODUCT_API_URL=http://demo-product-api:3000 demo-commerce-web:0.1.0
```

Or the whole platform via `demo-product-api/deploy/platform/docker-compose.yaml`.

## Kubernetes

```bash
kubectl apply -k deploy/kubernetes
```

`PRODUCT_API_URL` is wired in the ConfigMap to the in-cluster
`demo-product-api` Service DNS name.

## Governance / CI

See `demo-product-api/docs/governance/scenarios.md` and
`.github/workflows/ci.yml` (prettier+eslint+vitest → npm audit+gitleaks+
trivy → build → image build+scan → GHCR on `v*` tags).

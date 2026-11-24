# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-11-24

### Added

- Catalog page rendering product summaries with average ratings.
- Product page rendering details, specifications, rating distribution and
  customer reviews, including a degraded-mode banner for partial backend
  outages.
- Typed API client talking exclusively to demo-product-api through `/api`
  (Vite proxy in dev, nginx `proxy_pass` in the container).
- `X-Request-ID` generation on every outbound request for trace correlation.
- `/healthz` and `/readyz` endpoints served by nginx for probes.
- Unprivileged-nginx multi-stage Dockerfile with envsubst-templated
  `PRODUCT_API_URL`, Kubernetes manifests (`deploy/kubernetes`) and Backstage
  catalog descriptor (`catalog-info.yaml`).
- GitHub Actions CI pipeline (`.github/workflows/ci.yml`).

# Contributing

## Development setup

Requires Node.js 22+.

```sh
npm ci
npm test        # vitest + coverage gates
npm run dev     # vite dev server, proxies /api to localhost:3000
```

`make` targets wrap the same commands but a local `make` is not required.

## Conventions

- `eslint` and `prettier --check` must pass (`npm run format:write` to fix).
- The frontend only ever calls `demo-product-api` under `/api/*`. Do not call
  backend services directly.
- Commits: imperative mood, concise subject line.
- Update `CHANGELOG.md` under `Unreleased` for user-visible changes.

## Pull requests

- CI must be green: lint, format, tests, coverage >= 80%, Trivy image scan.
- Keep PRs focused; link related issues.

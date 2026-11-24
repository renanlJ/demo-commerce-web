APP := demo-commerce-web
IMAGE ?= $(APP):0.1.0

.PHONY: install lint format format-write test test-integration coverage build run docker-build docker-scan k8s-validate clean

install: ## npm ci (lockfile-pinned)
	npm ci

lint:
	npm run lint

format:
	npm run format

format-write:
	npm run format:write

test: ## vitest + coverage gates
	npm test

test-integration: test

coverage: test

build:
	npm run build

run: ## Vite dev server (proxies /api to localhost:3000)
	npm run dev

docker-build:
	docker build -t $(IMAGE) .

docker-scan:
	trivy image $(IMAGE)

k8s-validate:
	kubectl kustomize deploy/kubernetes | kubectl apply --dry-run=client -f -

clean:
	rm -rf node_modules dist coverage test-results

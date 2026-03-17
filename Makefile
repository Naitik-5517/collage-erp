.PHONY: help install dev build test lint format clean docker-up docker-down db-migrate db-seed db-reset

# Default target
.DEFAULT_GOAL := help

help: ## Show this help message
	@echo "College ERP - Makefile Commands"
	@echo "================================"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install all dependencies
	npm install

dev: ## Start development environment
	npm run dev

build: ## Build all packages and services
	npm run build

test: ## Run all tests
	npm run test

test-watch: ## Run tests in watch mode
	npm run test -- --watch

test-coverage: ## Run tests with coverage
	npm run test -- --coverage

lint: ## Run linter
	npm run lint

lint-fix: ## Fix linting issues
	npm run lint -- --fix

format: ## Format code
	npm run format

type-check: ## Run TypeScript type checking
	npm run type-check

clean: ## Clean build artifacts and node_modules
	npm run clean
	rm -rf node_modules
	rm -rf .turbo

docker-up: ## Start Docker services
	docker-compose -f infra/docker/docker-compose.dev.yml up -d

docker-down: ## Stop Docker services
	docker-compose -f infra/docker/docker-compose.dev.yml down

docker-logs: ## View Docker logs
	docker-compose -f infra/docker/docker-compose.dev.yml logs -f

db-generate: ## Generate database migrations
	npm run db:generate

db-migrate: ## Run database migrations
	npm run db:migrate

db-seed: ## Seed database
	npm run db:seed

db-reset: ## Reset database
	npm run db:reset

db-studio: ## Open Drizzle Studio
	npm run db:studio

setup: install docker-up db-migrate db-seed ## Complete project setup
	@echo "✅ Setup complete! Run 'make dev' to start development."

ci: lint type-check test build ## Run CI checks locally
	@echo "✅ All CI checks passed!"

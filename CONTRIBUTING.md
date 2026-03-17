# Contributing to College ERP

Thank you for considering contributing to College ERP! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)

## Code of Conduct

Please be respectful and considerate of others. We aim to foster an inclusive community.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/college-erp.git`
3. Install dependencies: `npm install`
4. Copy environment variables: `cp .env.example .env`
5. Start infrastructure: `docker-compose -f infra/docker/docker-compose.dev.yml up -d`
6. Run migrations: `npm run db:migrate`
7. Seed database: `npm run db:seed`
8. Start development: `npm run dev`

## Development Workflow

1. Create a new branch from `develop`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our coding standards

3. Write tests for your changes

4. Run tests and linting:
   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```

5. Commit your changes following commit guidelines

6. Push to your fork and create a Pull Request

## Coding Standards

- **TypeScript**: Use TypeScript for all code
- **Linting**: Follow Biome linting rules
- **Formatting**: Code is auto-formatted with Biome
- **Naming Conventions**:
  - Files: `kebab-case.ts`
  - Classes: `PascalCase`
  - Functions/Variables: `camelCase`
  - Constants: `UPPER_SNAKE_CASE`
  - Interfaces: `PascalCase` (no `I` prefix)

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

**Examples:**
```
feat(auth): add OAuth2 login support
fix(student): resolve enrollment date validation
docs(api): update authentication endpoints
```

## Pull Request Process

1. **Title**: Use conventional commit format
2. **Description**: 
   - Describe what changes you made
   - Link related issues
   - Add screenshots for UI changes
3. **Checklist**:
   - [ ] Tests pass locally
   - [ ] Code is linted
   - [ ] Documentation updated
   - [ ] No breaking changes (or documented)
4. **Review**: Wait for review from maintainers
5. **Merge**: Squash and merge after approval

## Testing

### Unit Tests
```bash
npm run test
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e
```

### Coverage
```bash
npm run test:coverage
```

Maintain minimum 70% code coverage for new code.

## Project Structure

- `apps/` - Frontend applications
- `services/` - Backend microservices
- `packages/` - Shared packages
- `infra/` - Infrastructure configs
- `docs/` - Documentation
- `tests/` - Test utilities and E2E tests

## Questions?

Feel free to open an issue or reach out to maintainers.

Thank you for contributing! 🎉

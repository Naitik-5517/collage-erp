# Development Setup Guide

## Prerequisites

- **Node.js**: >= 20.0.0
- **npm**: >= 10.0.0
- **Docker**: >= 24.0.0
- **Git**: >= 2.40.0

## Initial Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-org/college-erp.git
cd college-erp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your values
# At minimum, set:
# - DATABASE_URL
# - JWT_SECRET
# - REDIS_URL
```

### 4. Start Infrastructure

```bash
# Start PostgreSQL, Redis, Elasticsearch, Kafka
docker-compose -f infra/docker/docker-compose.dev.yml up -d

# Verify services are running
docker ps
```

### 5. Database Setup

```bash
# Generate migrations (if needed)
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database with test data
npm run db:seed
```

### 6. Start Development

```bash
# Start all services and apps
npm run dev

# Services will be available at:
# - API Gateway: http://localhost:8080
# - Web App: http://localhost:3000
# - Dashboard: http://localhost:3001
```

## Using Makefile (Recommended)

If you have `make` installed:

```bash
# Complete setup
make setup

# Start development
make dev

# Run tests
make test

# View all commands
make help
```

## Project Structure

```
college-erp/
├── apps/              # Frontend applications
│   ├── web/          # Public website (Next.js)
│   └── dashboard/    # Admin dashboard (React)
├── services/         # Backend microservices
│   ├── api-gateway/
│   ├── auth-service/
│   ├── student-service/
│   └── ...
├── packages/         # Shared packages
│   ├── db/           # Database & ORM
│   ├── types/        # TypeScript types
│   ├── utils/        # Utility functions
│   └── ...
├── infra/           # Infrastructure configs
├── docs/            # Documentation
└── tests/           # E2E & integration tests
```

## Available Scripts

### Root Level
```bash
npm run dev          # Start all services
npm run build        # Build all packages
npm run test         # Run tests
npm run lint         # Lint code
npm run format       # Format code
npm run type-check   # TypeScript type checking
npm run clean        # Clean build artifacts
```

### Database
```bash
npm run db:generate  # Generate migrations
npm run db:migrate   # Run migrations
npm run db:seed      # Seed database
npm run db:reset     # Reset database
npm run db:studio    # Open Drizzle Studio
```

### Docker
```bash
# Start all services
docker-compose -f infra/docker/docker-compose.dev.yml up -d

# Stop all services
docker-compose -f infra/docker/docker-compose.dev.yml down

# View logs
docker-compose -f infra/docker/docker-compose.dev.yml logs -f

# Restart a service
docker-compose -f infra/docker/docker-compose.dev.yml restart postgres
```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/my-feature
```

### 2. Make Changes

Edit code, add tests, update documentation.

### 3. Run Tests & Linting

```bash
npm run test
npm run lint
npm run type-check
```

### 4. Commit Changes

```bash
# Use conventional commits
git commit -m "feat(student): add enrollment validation"
```

### 5. Push & Create PR

```bash
git push origin feature/my-feature
```

Then create a Pull Request on GitHub.

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# View PostgreSQL logs
docker logs college_erp_postgres

# Restart PostgreSQL
docker restart college_erp_postgres
```

### Module Not Found

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clean Turbo cache
npm run clean
```

### TypeScript Errors

```bash
# Rebuild all packages
npm run build

# Check types
npm run type-check
```

## IDE Setup

### VS Code

Recommended extensions:
- ESLint
- Prettier
- TypeScript
- Biome
- Docker
- GitLens

Settings already configured in `.vscode/settings.json`.

### Other IDEs

Ensure your IDE supports:
- TypeScript
- EditorConfig
- Biome linting

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

### Watch Mode
```bash
npm run test -- --watch
```

### Coverage
```bash
npm run test -- --coverage
```

## Additional Resources

- [Architecture Documentation](../architecture/SYSTEM_ARCHITECTURE.md)
- [API Documentation](../api/API_CONVENTIONS.md)
- [Contributing Guide](../../CONTRIBUTING.md)
- [Database Guide](../architecture/DATABASE_DESIGN.md)

## Getting Help

- Check existing documentation
- Search GitHub issues
- Ask in team chat
- Create a new issue

Happy coding! 🚀

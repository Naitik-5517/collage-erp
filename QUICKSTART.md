# Quick Start Guide

Welcome to College ERP! This guide will help you get started quickly.

## Prerequisites

- **Node.js** 20+ and **npm** 10+
- **Docker** and **Docker Compose**
- **Git**

## Quick Setup (5 minutes)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd college-erp
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 3. Start Infrastructure

```bash
docker-compose -f infra/docker/docker-compose.dev.yml up -d
```

### 4. Database Setup

```bash
npm run db:migrate
npm run db:seed
```

### 5. Start Development

```bash
npm run dev
```

## Access the Application

- **Web App**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3001
- **API Gateway**: http://localhost:8080

## Available Commands

```bash
# Development
npm run dev              # Start all services
npm run build            # Build all packages
npm run test             # Run tests
npm run lint             # Lint code

# Database
npm run db:migrate       # Run migrations
npm run db:seed          # Seed data
npm run db:studio        # Open Drizzle Studio
npm run db:backup        # Backup database

# Utilities
npm run setup            # Complete setup script
npm run check:deps       # Check dependencies
make help               # View all make commands
```

## Docker Services

```bash
# Start/stop all services
docker-compose -f infra/docker/docker-compose.dev.yml up -d
docker-compose -f infra/docker/docker-compose.dev.yml down

# Start monitoring stack
docker-compose -f infra/monitoring/docker-compose.yml up -d
```

## Testing

```bash
npm run test                  # Run all tests
npm run test:watch            # Watch mode
npm run test:coverage         # With coverage
npm run test:integration      # Integration tests
npm run test:e2e              # E2E tests
```

## Default Credentials

After seeding, use these credentials to login:

**Admin:**
- Email: admin@college.edu
- Password: Admin@123

**Teacher:**
- Email: teacher@college.edu
- Password: Teacher@123

**Student:**
- Email: student@college.edu
- Password: Student@123

## Project Structure

```
college-erp/
├── apps/           # Frontend apps (Next.js, React)
├── services/       # Backend microservices
├── packages/       # Shared packages
│   ├── types/     # TypeScript types
│   ├── utils/     # Utilities
│   ├── db/        # Database & ORM
│   └── ...
├── infra/         # Infrastructure configs
├── tests/         # E2E & integration tests
└── docs/          # Documentation
```

## Key Features Implemented

✅ **Testing Infrastructure**
- Jest configuration
- Test utilities and mocks
- E2E and integration test structure

✅ **CI/CD Pipeline**
- GitHub Actions workflows
- Automated testing and deployment
- Security scanning

✅ **Shared Packages**
- Types, constants, utilities
- Testing helpers
- Telemetry & monitoring
- API contracts

✅ **Documentation**
- Architecture guides
- API conventions
- Setup guides
- Database design

✅ **Infrastructure**
- Docker configurations
- Kubernetes manifests
- Monitoring setup (Prometheus, Grafana)
- Security policies

✅ **Development Tools**
- Makefile for common tasks
- Database backup/restore scripts
- Dependency checker
- Deployment validation

## Monitoring & Observability

Access monitoring tools:

- **Grafana**: http://localhost:3000 (admin/admin)
- **Prometheus**: http://localhost:9090
- **Jaeger**: http://localhost:16686

## Common Issues

### Port already in use
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>
```

### Database connection failed
```bash
# Check PostgreSQL is running
docker ps | grep postgres
docker restart college_erp_postgres
```

### Module not found
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Next Steps

1. Read the [Architecture Documentation](docs/architecture/SYSTEM_ARCHITECTURE.md)
2. Check [API Conventions](docs/api/API_CONVENTIONS.md)
3. Review [Contributing Guidelines](CONTRIBUTING.md)
4. Explore the codebase and start coding!

## Getting Help

- 📖 [Full Documentation](docs/)
- 🐛 [Report Issues](https://github.com/your-org/college-erp/issues)
- 💬 Ask in team chat

Happy coding! 🚀

# Quick Reference Card - College ERP

## 🚀 Quick Commands

### First Time Setup
```bash
# 1. Clone and install
git clone <repo-url>
cd college-erp
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your settings

# 3. Start infrastructure
docker-compose -f infra/docker/docker-compose.dev.yml up -d

# 4. Setup database
npm run db:migrate
npm run db:seed

# 5. Start development
npm run dev
```

### Daily Development
```bash
# Start everything
docker-compose -f infra/docker/docker-compose.dev.yml up -d && npm run dev

# Or with Makefile
make dev
```

## 🔗 URLs

| Service | URL | Credentials |
|---------|-----|-------------|
| Web App | http://localhost:3000 | - |
| Admin Dashboard | http://localhost:3001 | - |
| API Gateway | http://localhost:8080 | - |
| Drizzle Studio | Run `npm run db:studio` | - |
| Grafana | http://localhost:3000 | admin/admin |
| Prometheus | http://localhost:9090 | - |
| Jaeger | http://localhost:16686 | - |

## 👤 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@college.edu | Admin@123 |
| Teacher | teacher@college.edu | Teacher@123 |
| Student | student@college.edu | Student@123 |

## 📦 NPM Scripts

### Development
- `npm run dev` - Start all services
- `npm run build` - Build all packages
- `npm run clean` - Clean build artifacts

### Database
- `npm run db:migrate` - Run migrations
- `npm run db:seed` - Seed database
- `npm run db:reset` - Reset database
- `npm run db:studio` - Open DB UI
- `npm run db:backup` - Backup database
- `npm run db:restore` - Restore database

### Testing
- `npm run test` - Run all tests
- `npm run test:watch` - Watch mode
- `npm run test:coverage` - With coverage
- `npm run test:integration` - Integration tests
- `npm run test:e2e` - E2E tests

### Code Quality
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code
- `npm run type-check` - TypeScript check

### Utilities
- `npm run setup` - Complete setup
- `npm run check:deps` - Check dependencies
- `npm run validate:deploy` - Validate deployment

## 🐳 Docker Commands

```bash
# Start all services
docker-compose -f infra/docker/docker-compose.dev.yml up -d

# Stop all services
docker-compose -f infra/docker/docker-compose.dev.yml down

# View logs
docker-compose -f infra/docker/docker-compose.dev.yml logs -f

# Restart a service
docker restart college_erp_postgres

# View running containers
docker ps
```

## 📊 Monitoring Stack

```bash
# Start monitoring services
docker-compose -f infra/monitoring/docker-compose.yml up -d

# Stop monitoring services
docker-compose -f infra/monitoring/docker-compose.yml down
```

## 🛠️ Makefile Commands

```bash
make help          # Show all commands
make setup         # Complete setup
make dev           # Start development
make build         # Build all packages
make test          # Run tests
make lint          # Lint code
make clean         # Clean artifacts
make docker-up     # Start Docker services
make docker-down   # Stop Docker services
make db-migrate    # Run migrations
make db-seed       # Seed database
make ci            # Run CI checks locally
```

## 🐛 Quick Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Docker Issues
```bash
# Restart Docker services
docker-compose -f infra/docker/docker-compose.dev.yml down
docker-compose -f infra/docker/docker-compose.dev.yml up -d
```

### Database Issues
```bash
# Restart database
docker restart college_erp_postgres

# Reset database
npm run db:reset
```

### Node Module Issues
```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Rebuild all packages
npm run build
npm run type-check
```

## 📁 Project Structure

```
college-erp/
├── apps/           # Frontend (Next.js, React)
├── services/       # Backend microservices
├── packages/       # Shared code
│   ├── types/     # TypeScript types
│   ├── utils/     # Utilities
│   ├── db/        # Database
│   └── ...
├── infra/         # Infrastructure
├── docs/          # Documentation
└── tests/         # Tests
```

## 📚 Documentation

- [Full Setup Instructions](FULL_SETUP_INSTRUCTIONS.md)
- [Quick Start Guide](QUICKSTART.md)
- [System Architecture](docs/architecture/SYSTEM_ARCHITECTURE.md)
- [API Conventions](docs/api/API_CONVENTIONS.md)
- [Contributing](CONTRIBUTING.md)
- [Security Policy](security/SECURITY_POLICY.md)

## 🔐 Environment Variables

Essential variables in `.env`:
- `DATABASE_URL` - PostgreSQL connection
- `REDIS_URL` - Redis connection
- `JWT_SECRET` - JWT signing key
- `JWT_REFRESH_SECRET` - Refresh token key
- `NEXTAUTH_SECRET` - NextAuth secret

## ⚡ Performance Tips

- Use `npm run dev` for hot reload
- Use `npm run build` before deployment
- Run `npm run clean` if builds are failing
- Use Docker volumes for persistence
- Enable caching in Redis

## 🎯 Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: description"

# Push and create PR
git push origin feature/my-feature
```

## 📞 Support

- 📖 Documentation: `docs/`
- 🐛 Issues: GitHub Issues
- 💬 Chat: Team Chat
- 📧 Email: support@example.com

---

**Print this or bookmark for quick access!**

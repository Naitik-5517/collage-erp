# Complete Setup Verification Checklist

Use this checklist to verify that your College ERP setup is complete and working correctly.

---

## ✅ Pre-Setup Verification

### Prerequisites Installed

- [ ] **Git installed**
  ```bash
  git --version
  # Expected: git version 2.x.x or higher
  ```

- [ ] **Node.js v20+ installed**
  ```bash
  node --version
  # Expected: v20.x.x or higher
  ```

- [ ] **npm v10+ installed**
  ```bash
  npm --version
  # Expected: 10.x.x or higher
  ```

- [ ] **Docker installed**
  ```bash
  docker --version
  # Expected: Docker version 24.x.x or higher
  ```

- [ ] **Docker Compose installed**
  ```bash
  docker-compose --version
  # Expected: Docker Compose version 2.x.x or higher
  ```

- [ ] **Docker Desktop running** (if on Windows/Mac)
  - Open Docker Desktop application
  - Verify green status indicator

- [ ] **Make installed** (Optional)
  ```bash
  make --version
  # Expected: GNU Make 3.x or 4.x
  ```

---

## ✅ Project Setup Verification

### Repository Cloned

- [ ] **Repository cloned successfully**
  ```bash
  cd college-erp
  ls
  # Expected: See package.json, README.md, apps/, services/, etc.
  ```

- [ ] **In correct directory**
  ```bash
  pwd
  # Expected: .../college-erp
  ```

### Dependencies Installed

- [ ] **npm install completed successfully**
  ```bash
  npm list --depth=0
  # Expected: List of installed packages, no errors
  ```

- [ ] **node_modules folder exists**
  ```bash
  ls node_modules
  # Expected: See many package folders
  ```

- [ ] **All workspaces recognized**
  ```bash
  npm list --workspaces
  # Expected: List of all apps, services, and packages
  ```

---

## ✅ Environment Configuration

### Environment File

- [ ] **.env file created**
  ```bash
  ls .env
  # Expected: .env file exists
  ```

- [ ] **DATABASE_URL configured**
  ```bash
  grep "DATABASE_URL" .env
  # Expected: DATABASE_URL=postgresql://...
  ```

- [ ] **REDIS_URL configured**
  ```bash
  grep "REDIS_URL" .env
  # Expected: REDIS_URL=redis://...
  ```

- [ ] **JWT_SECRET set** (not default value)
  ```bash
  grep "JWT_SECRET" .env
  # Expected: JWT_SECRET=<your-secret> (not "your_...")
  ```

- [ ] **JWT_REFRESH_SECRET set** (not default value)
  ```bash
  grep "JWT_REFRESH_SECRET" .env
  # Expected: JWT_REFRESH_SECRET=<your-secret> (not "your_...")
  ```

- [ ] **NEXTAUTH_SECRET set** (not default value)
  ```bash
  grep "NEXTAUTH_SECRET" .env
  # Expected: NEXTAUTH_SECRET=<your-secret> (not "your_...")
  ```

---

## ✅ Infrastructure Services

### Docker Services Running

- [ ] **All containers started**
  ```bash
  docker-compose -f infra/docker/docker-compose.dev.yml ps
  # Expected: All services "Up"
  ```

- [ ] **5 containers running**
  ```bash
  docker ps
  # Expected: See 5 containers
  ```

- [ ] **PostgreSQL running**
  ```bash
  docker ps | grep postgres
  # Expected: college_erp_postgres ... Up
  ```

- [ ] **Redis running**
  ```bash
  docker ps | grep redis
  # Expected: college_erp_redis ... Up
  ```

- [ ] **Elasticsearch running**
  ```bash
  docker ps | grep elasticsearch
  # Expected: college_erp_elasticsearch ... Up
  ```

- [ ] **Kafka running**
  ```bash
  docker ps | grep kafka
  # Expected: college_erp_kafka ... Up
  ```

- [ ] **Zookeeper running**
  ```bash
  docker ps | grep zookeeper
  # Expected: college_erp_zookeeper ... Up
  ```

### Service Health Checks

- [ ] **PostgreSQL accessible**
  ```bash
  docker exec college_erp_postgres pg_isready
  # Expected: accepting connections
  ```

- [ ] **Redis accessible**
  ```bash
  docker exec college_erp_redis redis-cli ping
  # Expected: PONG
  ```

- [ ] **Elasticsearch accessible**
  ```bash
  curl http://localhost:9200
  # Expected: JSON response with cluster info
  ```

---

## ✅ Database Setup

### Migrations

- [ ] **Migrations generated/exist**
  ```bash
  ls packages/db/src/migrations
  # Expected: See migration files
  ```

- [ ] **Migrations run successfully**
  ```bash
  npm run db:migrate
  # Expected: "Migration complete" or similar
  ```

### Seed Data

- [ ] **Seed data loaded**
  ```bash
  npm run db:seed
  # Expected: "Database seeded successfully"
  ```

### Drizzle Studio

- [ ] **Drizzle Studio accessible**
  ```bash
  npm run db:studio
  # Then open http://localhost:4983
  # Expected: Database UI loads
  ```

- [ ] **Tables visible in Studio**
  - Open Drizzle Studio
  - Expected: See tables like users, students, courses, etc.

- [ ] **Sample data visible**
  - Browse users table
  - Expected: See admin, teacher, student accounts

---

## ✅ Application Running

### Development Server

- [ ] **Dev server starts without errors**
  ```bash
  npm run dev
  # Expected: No red error messages, services start
  ```

- [ ] **All services report "ready"**
  - Look for: ✓ API Gateway ready
  - Look for: ✓ Web App ready
  - Look for: ✓ Dashboard ready

### Port Availability

- [ ] **Port 3000 available (or Web running)**
  ```bash
  curl http://localhost:3000
  # Expected: HTML response or "Cannot GET /" from Next.js
  ```

- [ ] **Port 3001 available (or Dashboard running)**
  ```bash
  curl http://localhost:3001
  # Expected: HTML response
  ```

- [ ] **Port 8080 available (or API Gateway running)**
  ```bash
  curl http://localhost:8080
  # Expected: Some response (might be 404, that's ok)
  ```

---

## ✅ Web Application Verification

### Web App (localhost:3000)

- [ ] **Homepage loads**
  - Open: http://localhost:3000
  - Expected: See College ERP homepage

- [ ] **No console errors**
  - Open browser console (F12)
  - Expected: No red error messages

- [ ] **Login page accessible**
  - Click "Login" or go to /login
  - Expected: See login form

- [ ] **Can login with student account**
  - Email: student@college.edu
  - Password: Student@123
  - Expected: Successfully logged in

- [ ] **Dashboard loads after login**
  - Expected: See student dashboard

- [ ] **Can logout**
  - Click logout button
  - Expected: Redirected to login/home

### Admin Dashboard (localhost:3001)

- [ ] **Admin dashboard loads**
  - Open: http://localhost:3001
  - Expected: See admin interface

- [ ] **Can login with admin account**
  - Email: admin@college.edu
  - Password: Admin@123
  - Expected: Successfully logged in

- [ ] **Admin features accessible**
  - Expected: See admin-specific menus/features

---

## ✅ API Gateway Verification

### Health Check

- [ ] **Health endpoint responds**
  ```bash
  curl http://localhost:8080/health
  # Expected: JSON with "status": "healthy"
  ```

- [ ] **Health check JSON valid**
  - Expected fields: status, timestamp, uptime, version

### API Endpoints

- [ ] **API base path accessible**
  ```bash
  curl http://localhost:8080/api/v1
  # Expected: Some response (might be 404, that's ok)
  ```

- [ ] **CORS working** (if testing from frontend)
  - Make API call from frontend
  - Expected: No CORS errors in console

---

## ✅ Testing Infrastructure

### Unit Tests

- [ ] **Tests can run**
  ```bash
  npm run test
  # Expected: Tests execute (pass or fail)
  ```

- [ ] **Test configuration valid**
  - Expected: Jest finds and runs tests

### Test Scripts

- [ ] **Test watch mode works**
  ```bash
  npm run test:watch
  # Then press 'q' to quit
  # Expected: Tests run in watch mode
  ```

- [ ] **Coverage report generates**
  ```bash
  npm run test:coverage
  # Expected: Coverage report created in coverage/
  ```

---

## ✅ Code Quality Tools

### Linting

- [ ] **Linting runs**
  ```bash
  npm run lint
  # Expected: Linting completes (with or without warnings)
  ```

- [ ] **Lint errors fixable**
  ```bash
  npm run lint:fix
  # Expected: Auto-fixable issues resolved
  ```

### Type Checking

- [ ] **Type checking runs**
  ```bash
  npm run type-check
  # Expected: Type check completes (with or without errors)
  ```

### Formatting

- [ ] **Code formatting works**
  ```bash
  npm run format
  # Expected: Code formatted successfully
  ```

---

## ✅ Build Process

### Build All Packages

- [ ] **Build completes successfully**
  ```bash
  npm run build
  # Expected: All packages build without errors
  ```

- [ ] **Dist folders created**
  ```bash
  ls packages/*/dist
  # Expected: See dist directories
  ```

---

## ✅ Database Operations

### Migrations

- [ ] **Generate migration works**
  ```bash
  # After making schema changes:
  npm run db:generate
  # Expected: New migration file created (if changes exist)
  ```

- [ ] **Reset database works**
  ```bash
  npm run db:reset
  # Expected: Database reset successfully
  ```

### Backup & Restore

- [ ] **Backup script works**
  ```bash
  npm run db:backup
  # Expected: Backup file created in backups/
  ```

- [ ] **Backup file exists**
  ```bash
  ls backups/
  # Expected: See backup-*.sql files
  ```

---

## ✅ Optional: Monitoring Stack

### Monitoring Services (If Started)

- [ ] **Prometheus accessible**
  - Open: http://localhost:9090
  - Expected: Prometheus UI loads

- [ ] **Grafana accessible**
  - Open: http://localhost:3000
  - Username: admin, Password: admin
  - Expected: Grafana UI loads

- [ ] **Jaeger accessible**
  - Open: http://localhost:16686
  - Expected: Jaeger UI loads

---

## ✅ Development Tools

### Git Hooks (If Husky Installed)

- [ ] **Pre-commit hook works**
  ```bash
  # Make a change and try to commit
  git add .
  git commit -m "test"
  # Expected: Linting runs before commit
  ```

### Make Commands (If Make Installed)

- [ ] **Make help works**
  ```bash
  make help
  # Expected: List of make commands
  ```

- [ ] **Make commands execute**
  ```bash
  make test
  # Expected: Tests run
  ```

---

## ✅ Documentation Verification

### Documentation Files

- [ ] **All setup docs exist**
  ```bash
  ls *.md
  # Expected: See README.md, QUICKSTART.md, FULL_SETUP_INSTRUCTIONS.md, etc.
  ```

- [ ] **Documentation readable**
  - Open DOCUMENTATION_INDEX.md
  - Expected: Index file shows all docs

---

## ✅ Performance Check

### Resource Usage

- [ ] **Docker not using excessive memory**
  ```bash
  docker stats --no-stream
  # Expected: Reasonable memory usage (< 4GB total)
  ```

- [ ] **Services start in reasonable time**
  - Expected: < 3 minutes for first start
  - Expected: < 1 minute for subsequent starts

---

## ✅ Final Verification

### Complete System Test

- [ ] **Can create new data**
  - Login to web app
  - Try creating something (if feature exists)
  - Expected: Data saves successfully

- [ ] **Data persists**
  - Restart services: `npm run dev`
  - Login again
  - Expected: Previously created data still exists

- [ ] **No errors in logs**
  - Check terminal running `npm run dev`
  - Expected: No critical errors

### Cleanup Test

- [ ] **Can stop all services**
  ```bash
  # Stop dev server: Ctrl+C
  docker-compose -f infra/docker/docker-compose.dev.yml down
  # Expected: All services stop cleanly
  ```

- [ ] **Can restart cleanly**
  ```bash
  docker-compose -f infra/docker/docker-compose.dev.yml up -d
  npm run dev
  # Expected: Everything starts again without issues
  ```

---

## 📊 Verification Summary

Count your checkmarks:

- **Total Possible**: ~100 checks
- **Your Score**: ___ / 100

**Scoring:**
- **90-100**: Perfect setup! 🎉
- **75-89**: Great setup, minor issues to resolve
- **60-74**: Good setup, some configuration needed
- **< 60**: Review failed items and troubleshoot

---

## 🐛 If Checks Fail

### Common Issues

**Docker containers not starting:**
```bash
docker-compose -f infra/docker/docker-compose.dev.yml down
docker-compose -f infra/docker/docker-compose.dev.yml up -d
```

**Port already in use:**
```bash
# Find and kill process
netstat -ano | findstr :3000  # Windows
lsof -ti:3000 | xargs kill -9 # Mac/Linux
```

**Database connection fails:**
```bash
docker restart college_erp_postgres
npm run db:migrate
```

**Build fails:**
```bash
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Tests fail:**
```bash
npm run build  # Build packages first
npm run test
```

---

## 📞 Still Having Issues?

1. Check [FULL_SETUP_INSTRUCTIONS.md](FULL_SETUP_INSTRUCTIONS.md#troubleshooting)
2. Review [QUICK_REFERENCE.md](QUICK_REFERENCE.md#troubleshooting)
3. Search GitHub Issues
4. Ask in team chat
5. Create a new issue with:
   - Your OS
   - Node/npm versions
   - Error messages
   - Which checks failed

---

## 🎉 Setup Complete!

If all (or most) checks pass, congratulations! Your College ERP development environment is ready.

**Next Steps:**
1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Explore the codebase
3. Pick an issue to work on
4. Start coding!

---

**Date Completed**: ___________  
**Time Taken**: ___________  
**Notes**: ___________

---

**Print this checklist or save it for future reference!**

# Complete Setup Instructions for New PC

This guide will walk you through setting up the College ERP project on a completely new machine from scratch.

## Table of Contents

1. [Prerequisites Installation](#prerequisites-installation)
2. [Project Setup](#project-setup)
3. [Environment Configuration](#environment-configuration)
4. [Infrastructure Setup](#infrastructure-setup)
5. [Database Setup](#database-setup)
6. [Running the Application](#running-the-application)
7. [Verification](#verification)
8. [Optional: Monitoring Setup](#optional-monitoring-setup)
9. [Troubleshooting](#troubleshooting)
10. [IDE Setup](#ide-setup)

---

## Prerequisites Installation

### 1. Install Git

**Windows:**
1. Download from https://git-scm.com/download/win
2. Run the installer
3. Use default settings
4. Verify: Open PowerShell and run `git --version`

**macOS:**
```bash
# Using Homebrew
brew install git

# Or download from https://git-scm.com/download/mac
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install git
```

### 2. Install Node.js (v20.x)

**Windows:**
1. Download from https://nodejs.org/en/download/ (LTS version 20.x)
2. Run the installer
3. Check "Automatically install necessary tools" option
4. Restart your computer
5. Verify installation:
```powershell
node --version   # Should show v20.x.x
npm --version    # Should show 10.x.x
```

**macOS:**
```bash
# Using Homebrew
brew install node@20

# Or download from https://nodejs.org/
```

**Linux (Ubuntu/Debian):**
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

### 3. Install Docker Desktop

**Windows:**
1. Download from https://www.docker.com/products/docker-desktop/
2. Run installer
3. Enable WSL 2 if prompted
4. Restart computer
5. Start Docker Desktop
6. Verify:
```powershell
docker --version
docker-compose --version
```

**macOS:**
1. Download from https://www.docker.com/products/docker-desktop/
2. Drag to Applications folder
3. Open Docker Desktop
4. Wait for Docker to start
5. Verify:
```bash
docker --version
docker-compose --version
```

**Linux (Ubuntu/Debian):**
```bash
# Install Docker
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Verify
docker --version
docker compose version
```

### 4. Install Make (Optional but Recommended)

**Windows:**
```powershell
# Using Chocolatey
choco install make

# Or using winget
winget install GnuWin32.Make

# Add to PATH if needed
```

**macOS:**
```bash
# Usually pre-installed, verify with:
make --version

# If not installed:
xcode-select --install
```

**Linux:**
```bash
# Usually pre-installed, verify with:
make --version

# If not installed:
sudo apt-get install build-essential
```

---

## Project Setup

### 1. Clone Repository

**Option A: Using HTTPS**
```bash
git clone https://github.com/your-org/college-erp.git
cd college-erp
```

**Option B: Using SSH** (if you have SSH keys set up)
```bash
git clone git@github.com:your-org/college-erp.git
cd college-erp
```

**Option C: Download ZIP** (if you don't have Git)
1. Download ZIP from GitHub
2. Extract to desired location
3. Open terminal in extracted folder

### 2. Install Dependencies

This will take 5-10 minutes depending on your internet speed.

```bash
npm install
```

**If you encounter errors:**
```bash
# Clear npm cache and try again
npm cache clean --force
npm install
```

---

## Environment Configuration

### 1. Create Environment File

**Windows (PowerShell):**
```powershell
Copy-Item .env.example .env
```

**macOS/Linux:**
```bash
cp .env.example .env
```

### 2. Edit Environment File

Open `.env` in your text editor and update the following:

```env
# -- DATABASE ----------------------------------
DATABASE_URL=postgresql://postgres:password@localhost:5432/college_erp
REDIS_URL=redis://localhost:6379

# -- AUTH ---------------------------------------
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_this
NEXTAUTH_SECRET=your_nextauth_secret_key_change_this
NEXTAUTH_URL=http://localhost:3000

# -- OAUTH (Optional for now) -------------------
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=

# -- EMAIL (Optional for now) -------------------
RESEND_API_KEY=

# -- SMS (Optional for now) ---------------------
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# -- MEDIA (Optional for now) -------------------
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# -- PAYMENTS (Optional for now) ----------------
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# -- VIDEO (Optional for now) -------------------
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
LIVEKIT_URL=

# -- SEARCH -------------------------------------
ELASTICSEARCH_URL=http://localhost:9200

# -- KAFKA --------------------------------------
KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=college-erp

# -- MONITORING (Optional) ----------------------
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
```

**Important:** Change the JWT secrets to random strings. You can generate them using:

**Windows (PowerShell):**
```powershell
# Generate random string
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

**macOS/Linux:**
```bash
# Generate random string
openssl rand -base64 32
```

---

## Infrastructure Setup

### 1. Start Docker Desktop

Make sure Docker Desktop is running before proceeding.

**Verify Docker is running:**
```bash
docker ps
```

If you see a list (even if empty), Docker is running.

### 2. Start Infrastructure Services

This will start PostgreSQL, Redis, Elasticsearch, Kafka, and Zookeeper.

**Windows (PowerShell):**
```powershell
docker-compose -f infra/docker/docker-compose.dev.yml up -d
```

**macOS/Linux:**
```bash
docker-compose -f infra/docker/docker-compose.dev.yml up -d
```

**This will take 2-5 minutes on first run** as it downloads Docker images.

### 3. Verify Services are Running

```bash
docker ps
```

You should see 5 containers running:
- college_erp_postgres
- college_erp_redis
- college_erp_elasticsearch
- college_erp_kafka
- college_erp_zookeeper

### 4. Wait for Services to be Ready

```bash
# Wait 30 seconds for services to initialize
# Windows (PowerShell):
Start-Sleep -Seconds 30

# macOS/Linux:
sleep 30
```

---

## Database Setup

### 1. Run Database Migrations

```bash
npm run db:migrate
```

**Expected output:**
```
Migrating database...
✅ Migration complete
```

### 2. Seed Database with Initial Data

```bash
npm run db:seed
```

**Expected output:**
```
Seeding database...
✅ Database seeded successfully
```

**Default test accounts created:**
- **Admin**: admin@college.edu / Admin@123
- **Teacher**: teacher@college.edu / Teacher@123
- **Student**: student@college.edu / Student@123

### 3. (Optional) Open Drizzle Studio

To view your database visually:

```bash
npm run db:studio
```

This will open http://localhost:4983 in your browser.

---

## Running the Application

### 1. Start Development Server

**Option A: Using npm**
```bash
npm run dev
```

**Option B: Using Make** (if installed)
```bash
make dev
```

This will start ALL services and applications:
- API Gateway (port 8080)
- All 12 microservices (ports 3001-3012)
- Web App (port 3000)
- Dashboard (port 3001)

**First startup will take 2-3 minutes** to build all packages.

### 2. Wait for Services to Start

Look for these messages in the terminal:
```
✓ API Gateway ready on http://localhost:8080
✓ Web App ready on http://localhost:3000
✓ Dashboard ready on http://localhost:3001
```

---

## Verification

### 1. Check Web Application

Open your browser and visit:

**Public Web App:**
- URL: http://localhost:3000
- You should see the College ERP homepage

**Admin Dashboard:**
- URL: http://localhost:3001
- You should see the admin login page

**API Gateway:**
- URL: http://localhost:8080/health
- You should see a JSON response with status "healthy"

### 2. Test Login

1. Go to http://localhost:3000
2. Click "Login"
3. Use credentials:
   - Email: `student@college.edu`
   - Password: `Student@123`
4. You should be logged in successfully

### 3. Check API Endpoints

**Using curl (macOS/Linux):**
```bash
curl http://localhost:8080/health
```

**Using PowerShell (Windows):**
```powershell
Invoke-RestMethod http://localhost:8080/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-03-17T10:00:00.000Z",
  "uptime": 123,
  "version": "1.0.0"
}
```

### 4. Check Database

```bash
npm run db:studio
```

Open http://localhost:4983 and verify:
- Tables are created
- Sample data is present

---

## Optional: Monitoring Setup

If you want to set up monitoring (Prometheus, Grafana, Jaeger):

### 1. Start Monitoring Stack

```bash
docker-compose -f infra/monitoring/docker-compose.yml up -d
```

### 2. Access Monitoring Tools

- **Grafana**: http://localhost:3000
  - Username: `admin`
  - Password: `admin`
  
- **Prometheus**: http://localhost:9090

- **Jaeger** (Tracing): http://localhost:16686

---

## Troubleshooting

### Issue: Port Already in Use

**Windows:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
# Find and kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Issue: Docker Not Starting

**Windows:**
1. Open Docker Desktop
2. Check if WSL 2 is enabled
3. Restart Docker Desktop
4. Restart computer if needed

**macOS:**
1. Quit Docker Desktop completely
2. Open Activity Monitor and kill all Docker processes
3. Restart Docker Desktop

**Linux:**
```bash
sudo systemctl restart docker
```

### Issue: Database Connection Failed

```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# If not running, restart it
docker restart college_erp_postgres

# Check logs
docker logs college_erp_postgres
```

### Issue: npm install Fails

```bash
# Clear cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Windows (PowerShell):
Remove-Item -Recurse -Force node_modules, package-lock.json

# Install again
npm install
```

### Issue: TypeScript Errors

```bash
# Build all packages
npm run build

# Run type check
npm run type-check
```

### Issue: Out of Memory

If you get "JavaScript heap out of memory" error:

**Windows (PowerShell):**
```powershell
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run dev
```

**macOS/Linux:**
```bash
export NODE_OPTIONS="--max-old-space-size=4096"
npm run dev
```

### Issue: Services Not Starting

```bash
# Check if all Docker services are running
docker ps

# Restart all services
docker-compose -f infra/docker/docker-compose.dev.yml down
docker-compose -f infra/docker/docker-compose.dev.yml up -d

# Wait 30 seconds
sleep 30

# Try again
npm run dev
```

---

## IDE Setup

### Visual Studio Code (Recommended)

1. **Install VS Code**: https://code.visualstudio.com/

2. **Open Project:**
   ```bash
   code .
   ```

3. **Install Recommended Extensions:**
   
   VS Code will prompt you to install recommended extensions. Click "Install All".
   
   Or install manually:
   - Biome (biomejs.biome)
   - ESLint
   - Tailwind CSS IntelliSense
   - Docker
   - GitLens
   - Jest Runner
   - Prettier (optional, Biome is primary)

4. **VS Code Settings:**
   
   Settings are already configured in `.vscode/settings.json`. Just reload VS Code.

### Other IDEs

**WebStorm:**
1. Open project folder
2. Enable TypeScript support
3. Install Biome plugin
4. Configure Node.js interpreter (v20)

**Cursor/Other:**
- Ensure TypeScript support is enabled
- Configure for Node.js v20
- Enable EditorConfig support

---

## Running Tests

Once setup is complete, you can run tests:

```bash
# Run all tests
npm run test

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run specific test suites
npm run test:integration
npm run test:e2e
```

---

## Development Workflow

### Daily Workflow

1. **Start Docker services** (if not running):
   ```bash
   docker-compose -f infra/docker/docker-compose.dev.yml up -d
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Make changes and test**

4. **Before committing:**
   ```bash
   npm run lint
   npm run type-check
   npm run test
   ```

5. **Commit changes:**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push
   ```

### Common Commands

```bash
# Development
npm run dev              # Start all services
npm run build            # Build all packages
npm run lint             # Lint code
npm run format           # Format code
npm run type-check       # Check TypeScript types

# Database
npm run db:migrate       # Run migrations
npm run db:seed          # Seed database
npm run db:reset         # Reset database
npm run db:studio        # Open database UI
npm run db:backup        # Backup database

# Testing
npm run test             # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage

# Utilities
npm run check:deps       # Check dependencies
npm run clean            # Clean build artifacts

# Makefile commands (if Make is installed)
make help                # Show all commands
make setup               # Complete setup
make dev                 # Start development
make test                # Run tests
make ci                  # Run CI checks
```

---

## Next Steps

1. **Read Documentation:**
   - [QUICKSTART.md](QUICKSTART.md)
   - [docs/architecture/SYSTEM_ARCHITECTURE.md](docs/architecture/SYSTEM_ARCHITECTURE.md)
   - [docs/development/SETUP_GUIDE.md](docs/development/SETUP_GUIDE.md)
   - [CONTRIBUTING.md](CONTRIBUTING.md)

2. **Explore the Codebase:**
   - Check `apps/` for frontend applications
   - Check `services/` for backend microservices
   - Check `packages/` for shared packages

3. **Start Developing:**
   - Create a new branch
   - Make your changes
   - Write tests
   - Submit a pull request

---

## Complete Setup Checklist

✅ **Ready to verify your setup?**

We've created a comprehensive verification checklist with 100+ checks to ensure everything is working correctly:

👉 **Go to [SETUP_VERIFICATION_CHECKLIST.md](SETUP_VERIFICATION_CHECKLIST.md)**

The checklist includes:
- Prerequisites verification
- Infrastructure health checks
- Application functionality tests
- Database operations validation
- API endpoint testing
- Performance checks
- Troubleshooting for failed checks

Print it out or use it digitally to systematically verify each component of your setup!

---

## Getting Help

If you encounter any issues not covered here:

1. Check the [Troubleshooting](#troubleshooting) section
2. Search for existing issues in the GitHub repository
3. Check the documentation in `docs/` folder
4. Ask in team chat or create a new issue

---

## Estimated Time

- **Prerequisites installation**: 30-60 minutes (only needed once)
- **Project setup**: 10-15 minutes
- **First-time Docker setup**: 5-10 minutes
- **Total for first setup**: 45-85 minutes

**Subsequent setups:**
- Just start Docker and run `npm run dev`: 2-3 minutes

---

## Support

For additional help:
- 📖 [Full Documentation](docs/)
- 🐛 [Report Issues](https://github.com/your-org/college-erp/issues)
- 💬 Team Chat
- 📧 Email Support

---

**Last Updated**: March 17, 2026  
**Version**: 1.0.0

Happy Coding! 🚀

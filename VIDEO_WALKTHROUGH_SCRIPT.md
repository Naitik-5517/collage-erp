# Setup Video Walkthrough Script

This script can be used to create a video tutorial or followed as a detailed walkthrough guide.

---

## 🎬 Video Script - College ERP Setup (15-20 minutes)

### Introduction (0:00 - 1:00)

**[Screen: College ERP Logo/GitHub Page]**

> "Hello! In this video, I'll show you how to set up the College ERP system on your computer from scratch. By the end of this tutorial, you'll have a fully functional development environment running locally."

**What we'll cover:**
- Installing prerequisites
- Setting up the project
- Configuring the environment
- Starting all services
- Verifying everything works

**Prerequisites you'll need:**
- A computer with at least 8GB RAM
- Internet connection
- Administrator/sudo access
- About 20GB free disk space

Let's get started!

---

### Part 1: Installing Node.js (1:00 - 3:00)

**[Screen: nodejs.org]**

> "First, we need Node.js version 20 or higher. I'll show you how to install it."

**Steps:**
1. Open browser and go to nodejs.org
2. Click on "Download" for the LTS version (20.x)
3. Run the installer
4. **Important:** Check the box that says "Automatically install necessary tools"
5. Click Next through the installer
6. Wait for installation to complete

**[Screen: PowerShell/Terminal]**

> "Let's verify the installation:"

```bash
node --version
npm --version
```

> "You should see Node v20.x.x and npm v10.x.x. Perfect!"

---

### Part 2: Installing Docker Desktop (3:00 - 5:00)

**[Screen: docker.com]**

> "Next, we need Docker Desktop to run our infrastructure services."

**Steps:**
1. Go to docker.com/products/docker-desktop
2. Download Docker Desktop for your operating system
3. Run the installer
4. **Windows users:** Enable WSL 2 if prompted
5. Restart your computer
6. Start Docker Desktop and wait for it to initialize

**[Screen: Docker Desktop running]**

> "You should see Docker Desktop running with a green icon. Let's verify:"

```bash
docker --version
docker-compose --version
```

> "Great! Docker is ready."

---

### Part 3: Installing Git (5:00 - 6:00)

**[Screen: git-scm.com]**

> "We need Git to clone the repository."

**Steps:**
1. Go to git-scm.com
2. Download Git for your OS
3. Run installer with default settings

**[Screen: Terminal]**

> "Verify installation:"

```bash
git --version
```

> "Perfect! Now we have all prerequisites installed."

---

### Part 4: Cloning the Project (6:00 - 7:30)

**[Screen: GitHub repository page]**

> "Now let's get the project code."

**Steps:**
1. Copy the repository URL
2. Open terminal in your desired folder

**[Screen: Terminal]**

```bash
git clone https://github.com/your-org/college-erp.git
cd college-erp
```

> "The project is now downloaded. Let's install the dependencies:"

```bash
npm install
```

> "This will take 5-10 minutes. While that's running, let's talk about what this project includes..."

**[Screen: Show project structure]**

> "We have:
- Frontend applications in the 'apps' folder
- Backend microservices in 'services'
- Shared packages for code reusability
- Infrastructure configurations
- Comprehensive documentation"

---

### Part 5: Environment Configuration (7:30 - 9:00)

**[Screen: Terminal showing npm install completed]**

> "Great! Dependencies are installed. Now we need to configure our environment."

**[Screen: File explorer showing .env.example]**

> "We have a sample environment file. Let's create our own:"

**Windows:**
```powershell
Copy-Item .env.example .env
```

**Mac/Linux:**
```bash
cp .env.example .env
```

**[Screen: Opening .env in VS Code]**

> "Now let's edit this file. The most important settings are:"

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/college_erp
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
```

> "For JWT secrets, you should use random strings. Here's how to generate them:"

**Windows:**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

**Mac/Linux:**
```bash
openssl rand -base64 32
```

> "Copy these generated strings to your .env file. Everything else can stay as-is for development."

**[Screen: Save .env file]**

> "Save the file. We're ready for the next step!"

---

### Part 6: Starting Infrastructure (9:00 - 11:00)

**[Screen: Terminal]**

> "Now we'll start our infrastructure services using Docker. This includes PostgreSQL, Redis, Elasticsearch, and Kafka."

```bash
docker-compose -f infra/docker/docker-compose.dev.yml up -d
```

> "The first time you run this, it will download Docker images. This takes a few minutes."

**[Screen: Docker Desktop showing containers starting]**

> "Let's verify the containers are running:"

```bash
docker ps
```

> "You should see 5 containers:
- college_erp_postgres
- college_erp_redis
- college_erp_elasticsearch
- college_erp_kafka
- college_erp_zookeeper"

**[Screen: Terminal]**

> "Let's wait 30 seconds for services to fully initialize:"

**Windows:**
```powershell
Start-Sleep -Seconds 30
```

**Mac/Linux:**
```bash
sleep 30
```

---

### Part 7: Database Setup (11:00 - 12:30)

**[Screen: Terminal]**

> "Now we'll set up our database. First, let's run migrations to create all tables:"

```bash
npm run db:migrate
```

**[Screen: Show migration output]**

> "Great! Now let's seed the database with initial data, including test accounts:"

```bash
npm run db:seed
```

**[Screen: Show seed output]**

> "Perfect! Our database now has:
- Sample users (admin, teacher, student)
- Course data
- Test records"

> "The default test accounts are:
- Admin: admin@college.edu / Admin@123
- Teacher: teacher@college.edu / Teacher@123
- Student: student@college.edu / Student@123"

---

### Part 8: Starting Development Server (12:30 - 14:00)

**[Screen: Terminal]**

> "Now for the exciting part - let's start the development server!"

```bash
npm run dev
```

> "This will start:
- API Gateway on port 8080
- 12 microservices on various ports
- Web application on port 3000
- Admin dashboard on port 3001"

**[Screen: Terminal showing services starting]**

> "The first startup takes 2-3 minutes as it builds all packages. You'll see build progress for each service."

**[Screen: Terminal showing 'ready' messages]**

> "Look for these messages:
- ✓ API Gateway ready on http://localhost:8080
- ✓ Web App ready on http://localhost:3000
- ✓ Dashboard ready on http://localhost:3001"

> "When you see these, everything is ready!"

---

### Part 9: Verification (14:00 - 16:00)

**[Screen: Browser opening localhost:3000]**

> "Let's verify everything works. First, the web application:"

**Open:** http://localhost:3000

> "You should see the College ERP homepage. Looking good!"

**[Screen: Click Login]**

> "Let's test login with our student account:"

- Email: student@college.edu
- Password: Student@123

**[Screen: Successful login, showing dashboard]**

> "Excellent! We're logged in and can see the dashboard."

**[Screen: Open new tab - localhost:3001]**

> "Let's check the admin dashboard:"

**Open:** http://localhost:3001

> "Here's the admin interface. You can log in with admin@college.edu / Admin@123"

**[Screen: Open new tab - localhost:8080/health]**

> "Finally, let's verify the API Gateway:"

**Open:** http://localhost:8080/health

**[Screen: JSON response]**

```json
{
  "status": "healthy",
  "timestamp": "...",
  "uptime": 123,
  "version": "1.0.0"
}
```

> "Perfect! All services are responding correctly."

---

### Part 10: Optional - Drizzle Studio (16:00 - 17:00)

**[Screen: Terminal]**

> "There's one more tool I want to show you - Drizzle Studio for database management."

```bash
npm run db:studio
```

**[Screen: Browser opening localhost:4983]**

> "This opens a visual database browser where you can:
- View all tables
- Edit records
- Run queries
- Explore relationships"

**[Screen: Exploring tables in Drizzle Studio]**

> "Really handy for development!"

---

### Conclusion & Next Steps (17:00 - 18:00)

**[Screen: Back to code editor]**

> "Congratulations! You now have College ERP running locally. Here's what we've accomplished:"

✅ Installed all prerequisites
✅ Cloned and configured the project
✅ Started infrastructure services
✅ Set up the database
✅ Launched all applications
✅ Verified everything works

**Next steps:**

1. **Explore the codebase:**
   - Apps folder for frontend
   - Services folder for backend
   - Packages folder for shared code

2. **Read the documentation:**
   - QUICKSTART.md for quick reference
   - docs/ folder for detailed guides
   - CONTRIBUTING.md for development guidelines

3. **Start developing:**
   - Create a new branch
   - Make your changes
   - Run tests with `npm run test`
   - Submit a pull request

**[Screen: Show helpful commands]**

> "Here are some useful commands you'll use:"

```bash
npm run dev          # Start development
npm run test         # Run tests
npm run lint         # Check code quality
npm run db:studio    # Open database UI
```

> "You can also use Make commands if you have Make installed:"

```bash
make dev            # Start development
make test           # Run tests
make help           # See all commands
```

---

### Troubleshooting (18:00 - 19:00)

**[Screen: Common issues]**

> "If you run into issues, here are quick fixes:"

**Port already in use:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Docker issues:**
```bash
# Restart services
docker-compose -f infra/docker/docker-compose.dev.yml down
docker-compose -f infra/docker/docker-compose.dev.yml up -d
```

**Database connection issues:**
```bash
# Restart PostgreSQL
docker restart college_erp_postgres
```

**Module issues:**
```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
```

---

### Final Words (19:00 - 20:00)

**[Screen: Project structure/documentation]**

> "For more help, check out these resources:"

- **FULL_SETUP_INSTRUCTIONS.md** - Complete written guide
- **QUICK_REFERENCE.md** - Command cheat sheet
- **SETUP_FLOWCHART.md** - Visual setup guide
- **docs/** folder - Detailed documentation

> "Join our community:
- GitHub Issues for bugs and features
- Team chat for questions
- Contributing guide for collaboration"

**[Screen: College ERP running]**

> "You're all set! Happy coding, and welcome to the College ERP project!"

**[End screen with links]**

- GitHub: github.com/your-org/college-erp
- Docs: Full documentation in the docs/ folder
- Support: Issues and discussions on GitHub

---

## 📸 Screenshots to Capture

For the video, capture these key moments:

1. **Node.js installation** - Installer wizard
2. **Docker Desktop** - Running with green status
3. **Terminal** - Running npm install with progress
4. **VS Code** - Editing .env file
5. **Docker Desktop** - All containers running
6. **Terminal** - Database migration success
7. **Terminal** - Seed data success
8. **Terminal** - Dev server starting with logs
9. **Browser** - Homepage at localhost:3000
10. **Browser** - Login page
11. **Browser** - Student dashboard after login
12. **Browser** - Admin dashboard at localhost:3001
13. **Browser** - API health check response
14. **Browser** - Drizzle Studio interface
15. **VS Code** - Project structure overview

---

## 🎥 Production Notes

**Video Length:** 18-20 minutes
**Format:** Screen recording with voiceover
**Resolution:** 1920x1080 minimum
**Frame Rate:** 30fps or 60fps

**Editing Tips:**
- Use speed-up (1.5-2x) for long installations
- Add chapter markers for each section
- Include text overlays for important commands
- Show keyboard shortcuts you use
- Pause to explain complex concepts
- Add error scenarios and fixes

**Audio:**
- Clear microphone
- Remove background noise
- Consistent volume levels
- Moderate speaking pace

---

## 📝 Video Description Template

```
🚀 College ERP - Complete Setup Guide

Learn how to set up the College ERP system on your computer from scratch! 
This comprehensive tutorial covers everything from installing prerequisites 
to running your first application.

⏱️ TIMESTAMPS:
00:00 - Introduction
01:00 - Installing Node.js
03:00 - Installing Docker Desktop
05:00 - Installing Git
06:00 - Cloning the Project
07:30 - Environment Configuration
09:00 - Starting Infrastructure
11:00 - Database Setup
12:30 - Starting Development Server
14:00 - Verification & Testing
16:00 - Drizzle Studio (Database UI)
17:00 - Next Steps & Useful Commands
18:00 - Troubleshooting Common Issues

📚 RESOURCES:
- Written Guide: [Link to FULL_SETUP_INSTRUCTIONS.md]
- Quick Reference: [Link to QUICK_REFERENCE.md]
- GitHub Repository: [Link]
- Documentation: [Link to docs folder]

💻 REQUIREMENTS:
- 8GB+ RAM
- 20GB free disk space
- Internet connection
- Administrator access

🔗 USEFUL LINKS:
- Node.js: https://nodejs.org
- Docker: https://docker.com
- Git: https://git-scm.com

❓ QUESTIONS?
Drop them in the comments and I'll help you out!

#programming #nodejs #docker #development #tutorial
```

---

**Note:** This script is designed to be natural and conversational while being technically accurate. Adjust timing and pacing based on your speaking speed and any additional explanations you want to include.

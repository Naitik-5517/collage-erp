# Upload Project to GitHub - Step-by-Step Guide

This guide will walk you through uploading your College ERP project to GitHub.

---

## Prerequisites

- ✅ Git installed (you have this)
- ✅ GitHub account created
- ✅ Project ready to upload

---

## Step 1: Configure Git (First Time Only)

If you haven't configured Git before, set your name and email:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Verify configuration:**
```powershell
git config --global user.name
git config --global user.email
```

---

## Step 2: Initialize Git Repository

Navigate to your project and initialize Git:

```powershell
cd C:\Naitik\college-erp

# Initialize git repository
git init

# Set default branch name to 'main'
git branch -M main
```

**Expected output:**
```
Initialized empty Git repository in C:/Naitik/college-erp/.git/
```

---

## Step 3: Verify .gitignore

Your `.gitignore` file is already configured! It excludes:
- ✅ `node_modules/` (dependencies)
- ✅ `.env` files (secrets)
- ✅ `dist/` and `build/` (build outputs)
- ✅ IDE files
- ✅ Log files
- ✅ Database backups

**Important:** Make sure `.env` file is NOT committed (it's already in .gitignore)

---

## Step 4: Stage All Files

Add all project files to Git:

```powershell
# Add all files
git add .

# Check what will be committed
git status
```

**Expected output:**
```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   .editorconfig
        new file:   .env.example
        new file:   .gitignore
        new file:   README.md
        ... (many more files)
```

**Verify sensitive files are NOT staged:**
```powershell
git status | Select-String -Pattern ".env"
```

You should see `.env.example` but **NOT** `.env`

---

## Step 5: Create Initial Commit

Commit all files with a meaningful message:

```powershell
git commit -m "Initial commit: College ERP System with microservices architecture"
```

**Alternative detailed commit message:**
```powershell
git commit -m "Initial commit: College ERP System

- Microservices architecture (12 services)
- Next.js web app and admin dashboard
- PostgreSQL, Redis, Elasticsearch, Kafka integration
- Complete testing infrastructure
- CI/CD pipelines
- Comprehensive documentation
- Kubernetes deployment configs
- Monitoring stack setup"
```

**Expected output:**
```
[main (root-commit) abc1234] Initial commit: College ERP System
 XXX files changed, XXXXX insertions(+)
 create mode 100644 .gitignore
 ...
```

---

## Step 6: Create GitHub Repository

### Option A: Using GitHub Website (Recommended)

1. **Go to GitHub:**
   - Open https://github.com
   - Log in to your account

2. **Create New Repository:**
   - Click the **"+"** icon in top right
   - Select **"New repository"**

3. **Repository Settings:**
   - **Repository name:** `college-erp`
   - **Description:** "Enterprise College ERP System with LMS, Communication Platform, and comprehensive management tools"
   - **Visibility:** Choose **Public** or **Private**
   - ⚠️ **Do NOT** initialize with README, .gitignore, or license (you already have these)
   - Click **"Create repository"**

4. **Copy the repository URL:**
   - You'll see: `https://github.com/YOUR_USERNAME/college-erp.git`
   - Copy this URL

### Option B: Using GitHub CLI (If Installed)

```powershell
# Install GitHub CLI first (if not installed)
winget install GitHub.cli

# Login to GitHub
gh auth login

# Create repository
gh repo create college-erp --public --source=. --remote=origin --push
```

---

## Step 7: Connect Local Repository to GitHub

### If you used Option A (Website):

```powershell
# Add GitHub as remote origin (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/college-erp.git

# Verify remote is added
git remote -v
```

**Expected output:**
```
origin  https://github.com/YOUR_USERNAME/college-erp.git (fetch)
origin  https://github.com/YOUR_USERNAME/college-erp.git (push)
```

### If you used Option B (GitHub CLI):

Your repository is already connected and pushed! Skip to Step 9.

---

## Step 8: Push to GitHub

Push your code to GitHub:

```powershell
# Push to main branch
git push -u origin main
```

**First time:** You may be prompted for GitHub credentials.

**Expected output:**
```
Enumerating objects: XXX, done.
Counting objects: 100% (XXX/XXX), done.
Delta compression using up to X threads
Compressing objects: 100% (XXX/XXX), done.
Writing objects: 100% (XXX/XXX), X.XX MiB | X.XX MiB/s, done.
Total XXX (delta XX), reused 0 (delta 0)
To https://github.com/YOUR_USERNAME/college-erp.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## Step 9: Verify Upload

1. **Open your repository:**
   ```
   https://github.com/YOUR_USERNAME/college-erp
   ```

2. **Verify files are visible:**
   - Check that README.md is displayed
   - Browse folders (apps/, services/, packages/)
   - Verify documentation files are present

3. **Check .env is NOT uploaded:**
   - Search for `.env` in repository
   - Should only see `.env.example` and `.env.test`
   - ⚠️ If you see `.env`, remove it immediately!

---

## Step 10: Set Up Repository (Optional)

### Add Repository Details

1. **Add Topics:**
   - Click the ⚙️ icon next to "About"
   - Add topics: `erp`, `college`, `education`, `microservices`, `nextjs`, `typescript`, `nodejs`

2. **Add Description:**
   - "Enterprise College ERP System with LMS, Communication Platform, and comprehensive management tools"

3. **Add Website URL:**
   - Your deployed URL (when available)

### Enable GitHub Actions

GitHub Actions for CI/CD should automatically detect `.github/workflows/`:
- Go to **"Actions"** tab
- Review and enable workflows

### Set Up Branch Protection (Optional)

For team collaboration:
1. Go to **Settings** → **Branches**
2. Add branch protection rule for `main`
3. Enable:
   - Require pull request reviews
   - Require status checks to pass
   - Require branches to be up to date

---

## Common Commands for Future Updates

### After Making Changes:

```powershell
# Check what changed
git status

# Stage changed files
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push
```

### Create a New Branch:

```powershell
# Create and switch to new branch
git checkout -b feature/your-feature-name

# Push branch to GitHub
git push -u origin feature/your-feature-name
```

### Pull Latest Changes:

```powershell
# Get latest from GitHub
git pull origin main
```

---

## Troubleshooting

### Issue: "Authentication failed"

**Solution 1: Use Personal Access Token**
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic) with `repo` scope
3. Use token as password when pushing

**Solution 2: Use GitHub CLI**
```powershell
gh auth login
```

### Issue: ".env file was accidentally committed"

**Remove .env from Git:**
```powershell
# Remove from Git tracking (keeps local file)
git rm --cached .env

# Commit the removal
git commit -m "Remove .env file from repository"

# Push changes
git push
```

⚠️ **Important:** If `.env` was already pushed, consider rotating all secrets!

### Issue: "Large files (>100MB) causing errors"

**Use Git LFS for large files:**
```powershell
# Install Git LFS
git lfs install

# Track large files
git lfs track "*.zip"
git lfs track "*.tar"

# Add .gitattributes
git add .gitattributes
git commit -m "Add Git LFS tracking"
git push
```

### Issue: "Too many files to upload"

This is normal for first push. It may take several minutes.

**Progress check:**
```powershell
# Check repository size
git count-objects -vH
```

### Issue: "git: command not found" in PowerShell

**Solution:**
```powershell
# Restart PowerShell after Git installation
# Or add Git to PATH manually
$env:Path += ";C:\Program Files\Git\cmd"
```

---

## Security Checklist

Before pushing to GitHub (especially for public repositories):

- [ ] ✅ `.env` is in `.gitignore` and NOT committed
- [ ] ✅ No API keys in code
- [ ] ✅ No database passwords in code
- [ ] ✅ No JWT secrets in code
- [ ] ✅ `.env.example` has placeholder values only
- [ ] ✅ No personal information committed
- [ ] ✅ All secrets are in environment variables

**Verify no secrets are committed:**
```powershell
# Search for potential secrets
git log -p | Select-String -Pattern "password|secret|key|token" -Context 2
```

---

## Next Steps After Upload

1. **Share Repository:**
   - Share URL with team members
   - Add collaborators (Settings → Collaborators)

2. **Set Up CI/CD:**
   - GitHub Actions should run automatically
   - Review workflow results in "Actions" tab

3. **Create Project Board:**
   - Go to "Projects" tab
   - Create board for issue tracking

4. **Write Issues:**
   - Document known bugs
   - Plan new features
   - Assign tasks to team members

5. **Set Up Deployment:**
   - Configure deployment workflows
   - Add deployment secrets
   - Deploy to production

---

## Repository Statistics

Once uploaded, your repository will include:

- **~80+ Files** across the entire project
- **12 Microservices** (auth, student, academic, exam, finance, library, LMS, messaging, notification, report, search, api-gateway)
- **2 Frontend Apps** (Web, Dashboard)
- **11 Shared Packages** (types, constants, utils, db, kafka, logger, validators, emails, ui, testing, telemetry, contracts)
- **Complete Documentation** (setup guides, architecture docs, API docs)
- **Infrastructure Configs** (Docker, Kubernetes, monitoring)
- **CI/CD Pipelines** (GitHub Actions workflows)
- **Testing Infrastructure** (Jest configurations, test utilities)

---

## Quick Command Reference

```powershell
# One-time setup
git init
git branch -M main
git add .
git commit -m "Initial commit: College ERP System"
git remote add origin https://github.com/YOUR_USERNAME/college-erp.git
git push -u origin main

# Daily workflow
git status                    # Check changes
git add .                     # Stage changes
git commit -m "message"       # Commit changes
git push                      # Push to GitHub
git pull                      # Pull from GitHub

# Branch workflow
git checkout -b feature-name  # Create branch
git push -u origin feature-name  # Push branch
git checkout main             # Switch to main
git merge feature-name        # Merge branch
```

---

## Congratulations! 🎉

Your College ERP project is now on GitHub!

**Repository URL:**
```
https://github.com/YOUR_USERNAME/college-erp
```

**Badge for README:**
```markdown
[![GitHub](https://img.shields.io/github/stars/YOUR_USERNAME/college-erp?style=social)](https://github.com/YOUR_USERNAME/college-erp)
```

---

**Need Help?**
- GitHub Docs: https://docs.github.com
- Git Docs: https://git-scm.com/doc
- Check [CONTRIBUTING.md](CONTRIBUTING.md) for workflow

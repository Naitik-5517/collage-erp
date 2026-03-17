# Setup Process Flowchart

## Visual Setup Guide

```
┌─────────────────────────────────────────────────────────────┐
│                    COLLEGE ERP SETUP FLOW                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    1. PREREQUISITES                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌──────────────┬──────────────┬──────────────┐
        │              │              │              │
        ▼              ▼              ▼              ▼
   ┌────────┐    ┌─────────┐   ┌─────────┐   ┌─────────┐
   │  Git   │    │ Node.js │   │ Docker  │   │  Make   │
   │        │    │  v20+   │   │ Desktop │   │ (Opt)   │
   └────────┘    └─────────┘   └─────────┘   └─────────┘
        │              │              │              │
        └──────────────┴──────────────┴──────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    2. CLONE PROJECT                          │
│                                                              │
│  git clone https://github.com/your-org/college-erp.git     │
│  cd college-erp                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 3. INSTALL DEPENDENCIES                      │
│                                                              │
│  npm install                                                │
│  (Takes 5-10 minutes)                                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              4. CONFIGURE ENVIRONMENT                        │
│                                                              │
│  cp .env.example .env                                       │
│  Edit .env file with your settings                          │
│                                                              │
│  Required:                                                  │
│   - DATABASE_URL                                            │
│   - REDIS_URL                                               │
│   - JWT_SECRET                                              │
│   - JWT_REFRESH_SECRET                                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│             5. START INFRASTRUCTURE                          │
│                                                              │
│  docker-compose -f infra/docker/docker-compose.dev.yml up -d│
│                                                              │
│  This starts:                                               │
│   ✓ PostgreSQL (port 5432)                                 │
│   ✓ Redis (port 6379)                                      │
│   ✓ Elasticsearch (port 9200)                              │
│   ✓ Kafka (port 9092)                                      │
│   ✓ Zookeeper (port 2181)                                  │
│                                                              │
│  (Wait 30 seconds for services to initialize)              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   6. SETUP DATABASE                          │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
           ┌─────────────┐     ┌─────────────┐
           │   Migrate   │     │    Seed     │
           │             │     │             │
           │ npm run     │     │ npm run     │
           │ db:migrate  │────▶│  db:seed    │
           └─────────────┘     └─────────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │ Creates test accounts:│
                          │ - admin@college.edu   │
                          │ - teacher@college.edu │
                          │ - student@college.edu │
                          └───────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────┐
│              7. START DEVELOPMENT SERVER                     │
│                                                              │
│  npm run dev                                                │
│                                                              │
│  This starts:                                               │
│   ✓ API Gateway (port 8080)                                │
│   ✓ 12 Microservices (ports 3001-3012)                     │
│   ✓ Web App (port 3000)                                    │
│   ✓ Admin Dashboard (port 3001)                            │
│                                                              │
│  (First startup takes 2-3 minutes)                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    8. VERIFY SETUP                           │
└─────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │   Web App    │  │   Dashboard  │  │ API Gateway  │
    │              │  │              │  │              │
    │ localhost:   │  │ localhost:   │  │ localhost:   │
    │   3000       │  │   3001       │  │   8080       │
    └──────────────┘  └──────────────┘  └──────────────┘
            │                 │                 │
            └─────────────────┴─────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │   TEST LOGIN     │
                    │                  │
                    │ student@         │
                    │ college.edu      │
                    │ Student@123      │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  ✅ SETUP        │
                    │     COMPLETE!    │
                    └──────────────────┘
```

## Troubleshooting Flowchart

```
              ┌─────────────────────┐
              │   Issue Occurred?   │
              └─────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│Port Already  │ │Docker Issues │ │Database      │
│in Use        │ │              │ │Connection    │
└──────────────┘ └──────────────┘ └──────────────┘
        │               │               │
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│Kill process  │ │Restart Docker│ │Restart DB    │
│on port       │ │Desktop       │ │container     │
│              │ │              │ │              │
│lsof/netstat  │ │or services   │ │docker restart│
└──────────────┘ └──────────────┘ └──────────────┘
        │               │               │
        └───────────────┴───────────────┘
                        │
                        ▼
              ┌─────────────────────┐
              │   Still Not Fixed?  │
              └─────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│Check Docker  │ │Clean npm     │ │Review logs   │
│logs          │ │modules       │ │              │
│              │ │              │ │              │
│docker logs   │ │rm -rf        │ │npm run dev   │
│<container>   │ │node_modules  │ │(check output)│
└──────────────┘ └──────────────┘ └──────────────┘
```

## Time Estimates

```
┌─────────────────────────────────────────────────────────┐
│                    SETUP TIME BREAKDOWN                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Prerequisites (One-time)                               │
│  ├─ Git Installation           : 5-10 min              │
│  ├─ Node.js Installation       : 5-10 min              │
│  ├─ Docker Installation        : 10-30 min             │
│  ├─ Make Installation (Opt)    : 5 min                 │
│  └─ Total                      : 25-55 min             │
│                                                          │
│  Project Setup                                          │
│  ├─ Clone Repository           : 1-2 min               │
│  ├─ Install Dependencies       : 5-10 min              │
│  ├─ Configure Environment      : 2-3 min               │
│  ├─ Start Infrastructure       : 3-5 min               │
│  ├─ Database Setup             : 2-3 min               │
│  ├─ Start Dev Server           : 2-3 min               │
│  └─ Total                      : 15-26 min             │
│                                                          │
│  First Time Total              : 40-81 min             │
│  Subsequent Setups             : 2-3 min               │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Service Dependencies

```
┌─────────────────────────────────────────────────────────┐
│                   SERVICE DEPENDENCIES                   │
└─────────────────────────────────────────────────────────┘

                    Infrastructure Layer
    ┌──────────┬──────────┬──────────┬──────────┐
    │PostgreSQL│  Redis   │Elastic   │  Kafka   │
    │          │          │search    │          │
    └────┬─────┴────┬─────┴────┬─────┴────┬─────┘
         │          │          │          │
         └──────────┴──────────┴──────────┘
                    │
              Application Layer
    ┌───────────────┴───────────────┐
    │        API Gateway            │
    │       (Port 8080)             │
    └───────────────┬───────────────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
    ▼               ▼               ▼
┌─────────┐   ┌─────────┐   ┌─────────┐
│Auth     │   │Student  │   │Academic │
│Service  │   │Service  │   │Service  │
└─────────┘   └─────────┘   └─────────┘
    
    [+ 9 more microservices...]
                    │
              Frontend Layer
    ┌───────────────┼───────────────┐
    │               │               │
    ▼               ▼               ▼
┌─────────┐   ┌─────────┐   ┌─────────┐
│Web App  │   │Dashboard│   │Mobile   │
│(3000)   │   │(3001)   │   │API      │
└─────────┘   └─────────┘   └─────────┘
```

## Quick Decision Tree

```
                 Starting Setup?
                       │
        ┌──────────────┴──────────────┐
        │                             │
   First Time?                   Existing Setup?
        │                             │
        ▼                             ▼
┌──────────────┐              ┌──────────────┐
│Follow FULL   │              │Just run:     │
│SETUP         │              │docker-compose│
│INSTRUCTIONS  │              │  +           │
│              │              │npm run dev   │
│(45-85 min)   │              │(2-3 min)     │
└──────────────┘              └──────────────┘
```

## Platform-Specific Guides

```
┌─────────────────────────────────────────────────────────┐
│            PLATFORM-SPECIFIC COMMANDS                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Windows (PowerShell)                                   │
│  ├─ Copy env:  Copy-Item .env.example .env            │
│  ├─ Kill port: netstat -ano | findstr :3000           │
│  │             taskkill /PID <PID> /F                  │
│  └─ Generate:  -join ((48..57)+(65..90)+(97..122) |   │
│                Get-Random -Count 32 | % {[char]$_})    │
│                                                          │
│  macOS / Linux                                          │
│  ├─ Copy env:  cp .env.example .env                    │
│  ├─ Kill port: lsof -ti:3000 | xargs kill -9          │
│  └─ Generate:  openssl rand -base64 32                 │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

**Note:** Keep this flowchart handy during setup. For detailed step-by-step instructions, refer to [FULL_SETUP_INSTRUCTIONS.md](FULL_SETUP_INSTRUCTIONS.md).

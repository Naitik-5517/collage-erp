# College ERP System

Enterprise-level College ERP with LMS, Communication Platform, and comprehensive management tools.

[![CI](https://github.com/your-org/college-erp/workflows/CI/badge.svg)](https://github.com/your-org/college-erp/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org)

## 📚 Setup Documentation

**Choose your path:**

- 🆕 **New to the project?** → [Full Setup Instructions](FULL_SETUP_INSTRUCTIONS.md) (Complete guide, 45-85 min)
- ⚡ **Just want to code?** → [Quick Start Guide](QUICKSTART.md) (Fast setup, 5 min)
- 📋 **Need a reference?** → [Quick Reference Card](QUICK_REFERENCE.md) (Commands & troubleshooting)
- ✅ **Verify your setup?** → [Verification Checklist](SETUP_VERIFICATION_CHECKLIST.md) (100+ checks to ensure everything works)
- 🎬 **Prefer video format?** → [Video Walkthrough Script](VIDEO_WALKTHROUGH_SCRIPT.md) (Tutorial script)
- 📊 **Visual learner?** → [Setup Flowchart](SETUP_FLOWCHART.md) (Diagrams & flowcharts)
- 📖 **Everything else?** → [Documentation Index](DOCUMENTATION_INDEX.md) (Complete documentation guide)

## ✨ Features

- 🎓 **Student Management** - Complete student lifecycle management
- 📚 **Academic Management** - Courses, attendance, grades, and schedules
- 💰 **Finance Management** - Fee management, payments, and invoicing
- 📖 **Library Management** - Book catalog, issue/return, and fines
- 🎯 **Learning Management System** - Course content, assignments, online classes
- 📧 **Communication** - Messaging, notifications, and announcements
- 📊 **Reports & Analytics** - Comprehensive reporting and insights
- 🔍 **Search** - Full-text search powered by Elasticsearch
- 🔐 **Authentication** - JWT + OAuth2 (Google, Microsoft)
- 📱 **Mobile Ready** - Responsive design for all devices

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS
- **shadcn/ui** - Beautiful UI components

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Type-safe ORM
- **PostgreSQL** - Primary database
- **Redis** - Caching and sessions
- **Elasticsearch** - Full-text search
- **Kafka** - Event streaming

### Infrastructure
- **Docker** - Containerization
- **Kubernetes** - Orchestration
- **Prometheus** - Metrics collection
- **Grafana** - Metrics visualization
- **Jaeger** - Distributed tracing
- **GitHub Actions** - CI/CD

### Monorepo
- **Turborepo** - Build system
- **npm workspaces** - Package management

## 🚀 Quick Start

See [QUICKSTART.md](QUICKSTART.md) for a 5-minute setup guide.

### Prerequisites

- Node.js ≥ 20.0.0
- npm ≥ 10.0.0
- Docker & Docker Compose
- Git

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd college-erp

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Start infrastructure
docker-compose -f infra/docker/docker-compose.dev.yml up -d

# Setup database
npm run db:migrate
npm run db:seed

# Start development
npm run dev
```

### Access Applications

- **Web App**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3001
- **API Gateway**: http://localhost:8080
- **Drizzle Studio**: `npm run db:studio`

## 📁 Project Structure

```
college-erp/
├── apps/                    # Frontend applications
│   ├── web/                # Public website (Next.js)
│   └── dashboard/          # Admin dashboard (React + Vite)
├── services/               # Backend microservices
│   ├── api-gateway/       # API Gateway & routing
│   ├── auth-service/      # Authentication & authorization
│   ├── student-service/   # Student management
│   ├── academic-service/  # Academic operations
│   ├── exam-service/      # Exam & grades
│   ├── finance-service/   # Finance & payments
│   ├── library-service/   # Library management
│   ├── lms-service/       # Learning management
│   ├── messaging-service/ # Internal messaging
│   ├── notification-service/ # Notifications
│   ├── report-service/    # Reports & analytics
│   └── search-service/    # Search functionality
├── packages/              # Shared packages
│   ├── types/            # TypeScript types & interfaces
│   ├── constants/        # Application constants
│   ├── utils/            # Utility functions
│   ├── testing/          # Test utilities & mocks
│   ├── telemetry/        # Observability & tracing
│   ├── contracts/        # API contracts & events
│   ├── db/               # Database & Drizzle ORM
│   ├── kafka/            # Kafka client
│   ├── logger/           # Logging utilities
│   ├── validators/       # Validation schemas
│   ├── emails/           # Email templates
│   ├── ui/               # Shared UI components
│   └── config/           # Shared configurations
├── infra/                # Infrastructure
│   ├── docker/          # Docker configs
│   ├── k8s/             # Kubernetes manifests
│   ├── monitoring/      # Prometheus, Grafana
│   ├── kafka/           # Kafka configs
│   └── scripts/         # Infrastructure scripts
├── docs/                # Documentation
│   ├── architecture/    # System architecture
│   ├── api/            # API documentation
│   ├── development/    # Development guides
│   ├── modules/        # Module documentation
│   └── project-document/ # Project specs
├── tests/              # Tests
│   ├── e2e/           # End-to-end tests
│   ├── integration/   # Integration tests
│   ├── fixtures/      # Test data
│   └── utils/         # Test utilities
├── scripts/           # Utility scripts
│   ├── setup/        # Setup scripts
│   ├── db/           # Database scripts
│   ├── dev/          # Development utilities
│   └── deploy/       # Deployment scripts
└── security/         # Security policies

```

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start all services
npm run build            # Build all packages
npm run test             # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage
npm run test:integration # Integration tests
npm run test:e2e         # E2E tests

# Code Quality
npm run lint             # Lint code
npm run lint:fix         # Fix linting issues
npm run format           # Format code
npm run type-check       # TypeScript check

# Database
npm run db:generate      # Generate migrations
npm run db:migrate       # Run migrations
npm run db:seed          # Seed database
npm run db:reset         # Reset database
npm run db:studio        # Open Drizzle Studio
npm run db:backup        # Backup database
npm run db:restore       # Restore database

# Utilities
npm run setup            # Complete project setup
npm run check:deps       # Check dependencies
npm run validate:deploy  # Validate deployment
npm run clean            # Clean build artifacts

# Makefile (recommended)
make help               # View all commands
make setup              # Complete setup
make dev                # Start development
make test               # Run tests
make ci                 # Run CI checks locally
```

## 🧪 Testing

Comprehensive testing setup with Jest:

- **Unit Tests** - Test individual functions and components
- **Integration Tests** - Test service interactions
- **E2E Tests** - Test complete user workflows
- **Test Coverage** - Minimum 70% coverage required

```bash
npm run test                  # Run all tests
npm run test:watch            # Watch mode
npm run test:coverage         # Generate coverage report
npm run test:integration      # Integration tests only
npm run test:e2e              # E2E tests only
```

## 📊 Monitoring & Observability

Built-in monitoring stack:

- **Prometheus** - Metrics collection (http://localhost:9090)
- **Grafana** - Visualization (http://localhost:3000)
- **Jaeger** - Distributed tracing (http://localhost:16686)
- **Loki** - Log aggregation
- **OpenTelemetry** - Instrumentation

```bash
# Start monitoring stack
docker-compose -f infra/monitoring/docker-compose.yml up -d
```

## 🔐 Security

- JWT-based authentication
- Role-based access control (RBAC)
- OAuth2 integration (Google, Microsoft)
- AES-256 encryption at rest
- TLS/SSL in production
- Rate limiting
- Input validation & sanitization
- Security headers
- Regular dependency audits

See [Security Policy](security/SECURITY_POLICY.md) for details.

## 📖 Documentation

- [Quick Start Guide](QUICKSTART.md)
- [Setup Guide](docs/development/SETUP_GUIDE.md)
- [System Architecture](docs/architecture/SYSTEM_ARCHITECTURE.md)
- [Database Design](docs/architecture/DATABASE_DESIGN.md)
- [API Conventions](docs/api/API_CONVENTIONS.md)
- [Contributing Guide](CONTRIBUTING.md)

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by best practices in microservices architecture
- Community-driven development

## 📞 Support

- 📖 [Documentation](docs/)
- 🐛 [Issue Tracker](https://github.com/your-org/college-erp/issues)
- 💬 [Discussions](https://github.com/your-org/college-erp/discussions)

---

Made with ❤️ by the College ERP Team


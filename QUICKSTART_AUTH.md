# Quick Start Guide

## 🚀 Running the Authentication System

### Prerequisites
- Node.js 18+ installed
- PostgreSQL running
- Kafka running (optional for development)

### Step 1: Install Dependencies

```bash
# From the root of the project
npm install
```

### Step 2: Setup Environment Variables

**Backend (Auth Service)**
```bash
cd services/auth-service
cp .env.example .env.local
```

Edit `.env.local` and update:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/college_erp
JWT_ACCESS_SECRET=generate-a-strong-32-char-secret-key
JWT_REFRESH_SECRET=generate-another-strong-32-char-secret
```

**Frontend (Web App)**
```bash
cd apps/web
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXTAUTH_SECRET=your-nextauth-secret-key
AUTH_SERVICE_URL=http://localhost:4001/api/v1
```

### Step 3: Setup Database

```bash
# From root directory
npm run db:migrate
```

### Step 4: Start Services

**Terminal 1 - Auth Service:**
```bash
cd services/auth-service
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd apps/web
npm run dev
```

### Step 5: Test It Out

1. Open `http://localhost:3000/login`
2. Click "Create an account"
3. Register with:
   - Name: Test User
   - Email: test@example.com
   - Password: TestPass123!
4. Sign in with your credentials

## ✨ What You Can Do Now

### Registration
- Visit `/register`
- Create an account with email/password
- Automatically signs you in after registration

### Login
- Visit `/login`
- Login with email/password credentials
- Receives access token (15 min) and refresh token (7 days)

### Profile
- Visit `/dashboard` after logging in
- View your user profile
- Role-based access control

### Password Reset
- Visit `/forgot-password`
- Enter your email
- Check Kafka events for password reset notification

### API Testing

**Register:**
```bash
curl -X POST http://localhost:4001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:4001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

## 🔧 Troubleshooting

### Database Connection Error
```bash
# Verify PostgreSQL is running
psql -U postgres -l

# Create database if not exists
createdb -U postgres college_erp
```

### Port Already in Use
```bash
# Kill process on port 4001
npx kill-port 4001

# Kill process on port 3000
npx kill-port 3000
```

### Kafka Not Running
The service will work without Kafka, but events won't be published. To start Kafka:
```bash
docker-compose -f infra/kafka/docker-compose.yml up -d
```

## 📚 Next Steps

1. **Set up OAuth** - Get Google/Microsoft credentials
2. **Configure Notification Service** - For password reset emails
3. **Add More Users** - Test with different roles
4. **Explore API** - Check out the full API documentation

## 🎯 Key Features Implemented

✅ JWT-based authentication (access + refresh tokens)  
✅ Password hashing with BCrypt  
✅ Secure password reset flow  
✅ Kafka event publishing  
✅ NextAuth.js integration  
✅ Automatic token refresh  
✅ Role-based access control  
✅ Responsive UI with Tailwind CSS  
✅ API validation with Zod  
✅ Type-safe with TypeScript  

## 📖 Documentation

- Full API docs: `services/auth-service/README.md`
- Database schema: `packages/db/src/schemas/auth/`
- Frontend components: `apps/web/src/components/auth/`

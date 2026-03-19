# Authentication Service Setup Guide

## Overview

The authentication service provides JWT-based authentication with access and refresh tokens, OAuth support (Google/Microsoft), and Kafka event publishing.

## Features

✅ **Access & Refresh Tokens**: 15-minute access tokens, 7-day refresh tokens  
✅ **Multiple Auth Methods**: Email/password, Google OAuth, Microsoft OAuth  
✅ **Password Security**: BCrypt hashing with 12 rounds  
✅ **Password Reset**: Secure token-based reset flow  
✅ **Event-Driven**: Publishes auth events to Kafka  
✅ **API Standards**: Follows project API conventions  

## Architecture

```
Frontend (Next.js + NextAuth) ←→ Auth Service (Port 4001) ←→ PostgreSQL
                                         ↓
                                       Kafka
```

## Database Schema

### Tables Created

1. **users** - Core user information
2. **refresh_tokens** - Token storage with device tracking
3. **password_resets** - Password reset tokens

## Setup Instructions

### 1. Install Dependencies

```bash
cd services/auth-service
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update the following variables:

```env
PORT=4001
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/college_erp

# Generate secure secrets (min 32 chars)
JWT_ACCESS_SECRET=your-super-secret-access-key-min-32-chars
JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-chars

# Token expiry
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Kafka
KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=auth-service

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 3. Run Database Migrations

```bash
# From root directory
npm run db:migrate
```

This creates the following tables:
- `users`
- `refresh_tokens`
- `password_resets`

### 4. Start the Service

```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build
npm start
```

The service will be available at `http://localhost:4001`

## API Endpoints

### Public Endpoints

#### Register
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "isVerified": false
    },
    "tokens": {
      "accessToken": "jwt-token",
      "refreshToken": "jwt-token",
      "expiresIn": 900
    }
  },
  "message": "User registered successfully"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### Refresh Token
```http
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### Logout
```http
POST /api/v1/auth/logout
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### Forgot Password
```http
POST /api/v1/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Reset Password
```http
POST /api/v1/auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "newPassword": "NewSecurePass123!"
}
```

### Protected Endpoints (Require Access Token)

#### Get Profile
```http
GET /api/v1/auth/profile
Authorization: Bearer <access-token>
```

#### Change Password
```http
POST /api/v1/auth/change-password
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!"
}
```

#### Logout All Devices
```http
POST /api/v1/auth/logout-all
Authorization: Bearer <access-token>
```

## Token Flow

### 1. Initial Login
```
Client → POST /auth/login
Server → Returns accessToken + refreshToken
Client → Store both tokens
```

### 2. API Requests
```
Client → GET /auth/profile
       → Header: Authorization: Bearer <accessToken>
Server → Validates token → Returns data
```

### 3. Token Refresh (when access token expires)
```
Client → POST /auth/refresh {refreshToken}
Server → Returns new accessToken (same refreshToken)
Client → Update accessToken
```

## Kafka Events

The service publishes the following events:

### USER_CREATED
```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "name": "User Name",
  "role": "student",
  "timestamp": "2026-03-19T10:00:00Z"
}
```

### USER_LOGGED_IN
```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "deviceInfo": "user-agent-string",
  "ipAddress": "192.168.1.1",
  "timestamp": "2026-03-19T10:00:00Z"
}
```

### PASSWORD_RESET_REQUESTED
```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "timestamp": "2026-03-19T10:00:00Z"
}
```

### PASSWORD_CHANGED
```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "timestamp": "2026-03-19T10:00:00Z"
}
```

## Frontend Integration

### NextAuth Configuration

The frontend uses NextAuth.js configured to:
1. Use auth service for credentials validation
2. Store access/refresh tokens in JWT
3. Automatically refresh expired access tokens
4. Support OAuth providers (Google, Microsoft)

### Using Tokens in API Calls

```typescript
import { useSession } from 'next-auth/react';

function MyComponent() {
  const { data: session } = useSession();
  
  const callAPI = async () => {
    const response = await fetch('/api/some-endpoint', {
      headers: {
        'Authorization': `Bearer ${session?.user?.accessToken}`,
      },
    });
  };
}
```

## Security Best Practices

1. **Secrets**: Use strong, random secrets (32+ characters)
2. **HTTPS**: Always use HTTPS in production
3. **Rate Limiting**: Configured at 100 requests/15 minutes
4. **CORS**: Configure specific origins in production
5. **Token Storage**: Frontend stores tokens in HTTP-only cookies via NextAuth
6. **Password Policy**: Enforced minimum 8 chars with complexity requirements

## Testing

### Manual Testing

1. **Register a user**:
```bash
curl -X POST http://localhost:4001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
```

2. **Login**:
```bash
curl -X POST http://localhost:4001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
```

3. **Get Profile** (use token from login):
```bash
curl -X GET http://localhost:4001/api/v1/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Run Tests

```bash
npm test
```

## Troubleshooting

### Database Connection Error
- Verify `DATABASE_URL` in `.env.local`
- Ensure PostgreSQL is running
- Check database exists: `college_erp`

### Kafka Connection Error
- Ensure Kafka is running on configured port
- Service will log but continue without Kafka in development

### Token Validation Fails
- Check JWT secrets match between services
- Verify token hasn't expired
- Ensure proper Bearer format: `Authorization: Bearer <token>`

### Password Reset Not Working
- Notification service must be running to send emails
- Check Kafka events are being published

## Monitoring

### Health Check
```bash
curl http://localhost:4001/health
```

### Logs
The service logs important events:
- User registrations
- Login attempts
- Token refreshes
- Errors

## Next Steps

1. ✅ Set up notification service to handle password reset emails
2. ✅ Configure OAuth credentials for Google/Microsoft
3. ✅ Set up monitoring and alerting
4. ✅ Implement rate limiting per user
5. ✅ Add 2FA support
6. ✅ Implement email verification flow

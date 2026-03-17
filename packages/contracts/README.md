# API Client Package

This package provides typed HTTP clients for inter-service communication.

## Installation

```bash
npm install @college-erp/api-client
```

## Usage

```typescript
import { AuthClient, StudentClient } from '@college-erp/api-client';

const authClient = new AuthClient('http://auth-service:3001');
const studentClient = new StudentClient('http://student-service:3002');

// Login
const tokens = await authClient.login({
  email: 'user@example.com',
  password: 'password',
});

// Get student
const student = await studentClient.getStudent('student-id');
```

## Features

- Type-safe API calls
- Automatic retry with exponential backoff
- Request/response interceptors
- Error handling
- Timeout configuration
- Circuit breaker pattern

## Clients

- `AuthClient` - Authentication service
- `StudentClient` - Student service
- `AcademicClient` - Academic service
- `ExamClient` - Exam service
- `FinanceClient` - Finance service
- `LibraryClient` - Library service
- `LMSClient` - LMS service
- `MessagingClient` - Messaging service
- `NotificationClient` - Notification service

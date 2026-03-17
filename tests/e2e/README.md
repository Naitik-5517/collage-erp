# End-to-End Tests

This directory contains end-to-end tests for the College ERP system.

## Structure

- `auth/` - Authentication and authorization flows
- `student/` - Student management workflows
- `academic/` - Academic operations
- `finance/` - Financial transactions
- `lms/` - Learning management system flows

## Running E2E Tests

```bash
npm run test:e2e
```

## Writing E2E Tests

E2E tests should test complete user workflows across multiple services.

Example:
```typescript
describe('Student Enrollment Flow', () => {
  it('should register new student and enroll in courses', async () => {
    // Test implementation
  });
});
```

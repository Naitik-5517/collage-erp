# Integration Tests

This directory contains integration tests that verify interactions between services.

## Structure

- `service-to-service/` - Inter-service communication tests
- `database/` - Database integration tests
- `events/` - Event-driven communication tests
- `external/` - Third-party API integration tests

## Running Integration Tests

```bash
npm run test:integration
```

## Best Practices

1. Use test databases (separate from development)
2. Clean up test data after each test
3. Mock external APIs when possible
4. Test both success and failure scenarios

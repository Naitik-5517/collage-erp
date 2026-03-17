/**
 * Wait for a condition to be true
 */
export async function waitFor(
  condition: () => boolean | Promise<boolean>,
  options: { timeout?: number; interval?: number } = {}
): Promise<void> {
  const { timeout = 5000, interval = 100 } = options;
  const start = Date.now();
  
  while (Date.now() - start < timeout) {
    if (await condition()) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  
  throw new Error(`Timeout waiting for condition after ${timeout}ms`);
}

/**
 * Flush all pending promises
 */
export function flushPromises(): Promise<void> {
  return new Promise(resolve => setImmediate(resolve));
}

/**
 * Setup test database
 */
export async function setupTestDatabase(): Promise<void> {
  // Add your test database setup logic here
  // e.g., run migrations, seed data
}

/**
 * Teardown test database
 */
export async function teardownTestDatabase(): Promise<void> {
  // Add your test database teardown logic here
  // e.g., truncate tables, close connections
}

/**
 * Clean up test data
 */
export async function cleanupTestData(tables: string[]): Promise<void> {
  // Add logic to clean up specific tables
  // This is useful for cleaning up after integration tests
}

/**
 * Create test context
 */
export function createTestContext<T extends Record<string, any>>(data: T): T {
  return { ...data };
}

/**
 * Assert error thrown
 */
export async function assertThrows(
  fn: () => Promise<any> | any,
  errorMatch?: string | RegExp
): Promise<Error> {
  try {
    await fn();
    throw new Error('Expected function to throw but it did not');
  } catch (error: any) {
    if (errorMatch) {
      if (typeof errorMatch === 'string') {
        expect(error.message).toContain(errorMatch);
      } else {
        expect(error.message).toMatch(errorMatch);
      }
    }
    return error;
  }
}

/**
 * Sleep for testing
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

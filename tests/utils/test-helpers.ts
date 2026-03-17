import { randomBytes } from 'crypto';

/**
 * Generate a random test email
 */
export function generateTestEmail(): string {
  return `test-${randomBytes(8).toString('hex')}@test.college.edu`;
}

/**
 * Generate a random test ID
 */
export function generateTestId(prefix = 'test'): string {
  return `${prefix}-${randomBytes(16).toString('hex')}`;
}

/**
 * Wait for a condition to be true
 */
export async function waitFor(
  condition: () => boolean | Promise<boolean>,
  timeout = 5000,
  interval = 100
): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (await condition()) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
  throw new Error('Timeout waiting for condition');
}

/**
 * Sleep for a given duration
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Create a mock request object
 */
export function mockRequest(data: any = {}) {
  return {
    body: data.body || {},
    params: data.params || {},
    query: data.query || {},
    headers: data.headers || {},
    user: data.user || null,
  };
}

/**
 * Create a mock response object
 */
export function mockResponse() {
  const res: any = {
    statusCode: 200,
    data: null,
  };
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockImplementation((data) => {
    res.data = data;
    return res;
  });
  res.send = jest.fn().mockReturnValue(res);
  return res;
}

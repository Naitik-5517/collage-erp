/**
 * Custom Jest matchers
 */

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidEmail(): R;
      toBeValidPhone(): R;
      toBeValidDate(): R;
      toBeInPast(): R;
      toBeInFuture(): R;
    }
  }
}

export const customMatchers = {
  toBeValidEmail(received: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pass = emailRegex.test(received);

    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to be a valid email`
          : `expected ${received} to be a valid email`,
    };
  },

  toBeValidPhone(received: string) {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const pass = phoneRegex.test(received);

    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to be a valid phone number`
          : `expected ${received} to be a valid phone number`,
    };
  },

  toBeValidDate(received: any) {
    const date = new Date(received);
    const pass = date instanceof Date && !isNaN(date.getTime());

    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to be a valid date`
          : `expected ${received} to be a valid date`,
    };
  },

  toBeInPast(received: Date | string) {
    const date = new Date(received);
    const pass = date < new Date();

    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to be in the past`
          : `expected ${received} to be in the past`,
    };
  },

  toBeInFuture(received: Date | string) {
    const date = new Date(received);
    const pass = date > new Date();

    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to be in the future`
          : `expected ${received} to be in the future`,
    };
  },
};

// Export setup function to register matchers
export function setupMatchers() {
  expect.extend(customMatchers);
}

/**
 * Mock Express Request
 */
export function mockRequest(data: any = {}): any {
  return {
    body: data.body || {},
    params: data.params || {},
    query: data.query || {},
    headers: data.headers || {},
    user: data.user || null,
    cookies: data.cookies || {},
    session: data.session || {},
    get: jest.fn((header: string) => data.headers?.[header]),
  };
}

/**
 * Mock Express Response
 */
export function mockResponse(): any {
  const res: any = {
    statusCode: 200,
    data: null,
    headers: {},
  };
  
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockImplementation((data) => {
    res.data = data;
    return res;
  });
  res.send = jest.fn().mockReturnValue(res);
  res.sendStatus = jest.fn().mockReturnValue(res);
  res.set = jest.fn().mockImplementation((key, value) => {
    res.headers[key] = value;
    return res;
  });
  res.cookie = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  res.redirect = jest.fn().mockReturnValue(res);
  
  return res;
}

/**
 * Mock Express Next Function
 */
export function mockNext(): jest.Mock {
  return jest.fn();
}

/**
 * Mock Database Client
 */
export function mockDbClient(): any {
  return {
    query: jest.fn().mockResolvedValue({ rows: [], rowCount: 0 }),
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    returning: jest.fn().mockResolvedValue([]),
  };
}

/**
 * Mock Kafka Producer
 */
export function mockKafkaProducer(): any {
  return {
    connect: jest.fn().mockResolvedValue(undefined),
    disconnect: jest.fn().mockResolvedValue(undefined),
    send: jest.fn().mockResolvedValue(undefined),
  };
}

/**
 * Mock Kafka Consumer
 */
export function mockKafkaConsumer(): any {
  return {
    connect: jest.fn().mockResolvedValue(undefined),
    disconnect: jest.fn().mockResolvedValue(undefined),
    subscribe: jest.fn().mockResolvedValue(undefined),
    run: jest.fn().mockResolvedValue(undefined),
  };
}

/**
 * Mock Redis Client
 */
export function mockRedisClient(): any {
  const store = new Map();
  
  return {
    get: jest.fn().mockImplementation((key: string) => Promise.resolve(store.get(key) || null)),
    set: jest.fn().mockImplementation((key: string, value: any) => {
      store.set(key, value);
      return Promise.resolve('OK');
    }),
    del: jest.fn().mockImplementation((key: string) => {
      store.delete(key);
      return Promise.resolve(1);
    }),
    expire: jest.fn().mockResolvedValue(1),
    exists: jest.fn().mockImplementation((key: string) => Promise.resolve(store.has(key) ? 1 : 0)),
    flushall: jest.fn().mockImplementation(() => {
      store.clear();
      return Promise.resolve('OK');
    }),
  };
}

/**
 * Mock Logger
 */
export function mockLogger(): any {
  return {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    child: jest.fn().mockReturnThis(),
  };
}

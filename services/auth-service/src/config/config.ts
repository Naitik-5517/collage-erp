export const config = {
  port: process.env.PORT || 4001,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL || "",
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_SECRET || "your-access-secret-key-change-in-production",
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key-change-in-production",
    accessTokenExpiry: process.env.JWT_ACCESS_EXPIRY || "15m",
    refreshTokenExpiry: process.env.JWT_REFRESH_EXPIRY || "7d",
  },
  kafka: {
    brokers: (process.env.KAFKA_BROKERS || "localhost:9092").split(","),
    clientId: process.env.KAFKA_CLIENT_ID || "auth-service",
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100,
  },
  bcrypt: {
    rounds: 12,
  },
  passwordReset: {
    tokenExpiry: 60 * 60 * 1000,
  },
};

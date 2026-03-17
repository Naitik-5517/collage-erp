import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schemas/**/*.ts",
  out: "./src/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ??
      "postgresql://postgres:password@localhost:5432/college_erp",
  },
  verbose: true,
  strict: true,
});
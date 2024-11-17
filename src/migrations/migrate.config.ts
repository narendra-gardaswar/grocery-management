import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/app/**/schema/*.schema.ts',
  dialect: 'postgresql',
  out: './src/migrations/sql',
  dbCredentials: {
    url: process.env.POSTGRES_URL as string,
  },
  introspect: {
    casing: 'camel',
  },
  verbose: true,
  strict: true,
} satisfies Config;

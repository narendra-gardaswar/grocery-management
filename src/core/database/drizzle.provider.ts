import { FactoryProvider } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import { DatabaseConnection, POSTGRES_PROVIDER } from './postgres.provider';
export const DRIZZLE_PROVIDER = 'DRIZZLE_PROVIDER';

export const DrizzleProvider: FactoryProvider<ReturnType<typeof drizzle>> = {
  provide: DRIZZLE_PROVIDER,
  inject: [POSTGRES_PROVIDER],
  useFactory(client: DatabaseConnection) {
    const db = drizzle(client);
    return db;
  },
};

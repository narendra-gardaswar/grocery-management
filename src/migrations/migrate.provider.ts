import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import postgres from 'postgres';
import { EnvironmentVariables } from '@core/configs/config';

export type DatabaseConnection = postgres.Sql;
export const MIGRATE_PROVIDER = 'MIGRATE_PROVIDER';
export const MigrateProvider: FactoryProvider<ReturnType<typeof postgres>> = {
  provide: MIGRATE_PROVIDER,
  inject: [ConfigService],
  useFactory(configService: ConfigService) {
    const dbUrl = configService.getOrThrow<string>(
      EnvironmentVariables.POSTGRES_URL,
    );
    const client = postgres(dbUrl, { max: 1 });
    return client;
  },
};

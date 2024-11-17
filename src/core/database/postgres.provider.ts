import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import postgres from 'postgres';
import { EnvironmentVariables } from '../configs/config';

export type DatabaseConnection = postgres.Sql;

export const POSTGRES_PROVIDER = 'POSTGRES_PROVIDER';
export const PostgresProvider: FactoryProvider<ReturnType<typeof postgres>> = {
  provide: POSTGRES_PROVIDER,
  inject: [ConfigService],
  useFactory(configService: ConfigService) {
    const postgresUrl = configService.getOrThrow<string>(
      EnvironmentVariables.POSTGRES_URL,
    );
    const client = postgres(postgresUrl);

    return client;
  },
};

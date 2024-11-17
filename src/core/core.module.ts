import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from './configs/config';
import { AuthModule } from '@auth/auth.module';
import { DrizzleProvider, PostgresProvider } from './database';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/all-exception-filter';

@Global()
@Module({
  imports: [ConfigModule.forRoot(configOptions), AuthModule],
  providers: [
    Logger,
    PostgresProvider,
    DrizzleProvider,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [PostgresProvider, DrizzleProvider],
})
export class CoreModule {}

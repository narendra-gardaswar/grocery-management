import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from './configs/config';
import { AuthModule } from '@auth/auth.module';
import { DrizzleProvider, PostgresProvider } from './database';

@Global()
@Module({
  imports: [ConfigModule.forRoot(configOptions), AuthModule],
  providers: [Logger, PostgresProvider, DrizzleProvider],
  exports: [PostgresProvider, DrizzleProvider],
})
export class CoreModule {}

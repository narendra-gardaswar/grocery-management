import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from './configs/config';
import { AuthModule } from '@auth/auth.module';

@Global()
@Module({
  imports: [ConfigModule.forRoot(configOptions), AuthModule],
  providers: [Logger],
  exports: [],
})
export class CoreModule {}

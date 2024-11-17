import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from './configs/config';

@Global()
@Module({
  imports: [ConfigModule.forRoot(configOptions)],
  providers: [Logger],
  exports: [],
})
export class CoreModule {}

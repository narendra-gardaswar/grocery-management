import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from '../core/configs/config';
import { MigrateProvider } from './migrate.provider';
import { MigrationsService } from './migrate.service';

@Module({
  imports: [ConfigModule.forRoot(configOptions)],
  providers: [MigrateProvider, MigrationsService],
})
export class MigrationsModule {}

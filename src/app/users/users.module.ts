import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CoreModule } from '@core/core.module';
import { UsersRepo } from './users.repo';

@Module({
  imports: [CoreModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepo],
})
export class UsersModule {}

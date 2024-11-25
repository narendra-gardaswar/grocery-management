import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersRepo } from './orders.repo';
import { OrdersService } from './orders.service';

@Module({
  imports: [CoreModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepo],
})
export class OrdersModule {}

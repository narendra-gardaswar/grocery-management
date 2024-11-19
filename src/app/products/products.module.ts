import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsRepo } from './products.repo';
import { ProductsService } from './products.service';

@Module({
  imports: [CoreModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepo],
})
export class ProductsModule {}

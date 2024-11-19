import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@core/core.module';
import { UsersModule } from '@users/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [CoreModule, UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

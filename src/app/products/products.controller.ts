import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { RolesGuard } from '@core/guards/roles.guard';
import { USER_ROLE } from '@users/entities/users.entity';
import { Roles } from '@core/decorators';
import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { AddProductBody, AddProductResponse } from './dto/add-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(USER_ROLE.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/add')
  async addProduct(@Body() body: AddProductBody): Promise<AddProductResponse> {
    return await this.productsService.addProduct(body);
  }
}

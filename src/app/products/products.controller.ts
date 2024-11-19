import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { RolesGuard } from '@core/guards/roles.guard';
import { USER_ROLE } from '@users/entities/users.entity';
import { Roles } from '@core/decorators';
import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { AddProductBody, AddProductResponse } from './dto/add-product.dto';
import { GetProductParams, GetProductResponse } from './dto/get-product.dto';
import {
  GetProductsListBody,
  GetProductsListResponse,
} from './dto/get-products-list.dto';
import {
  UpdateProductBody,
  UpdateProductParams,
  UpdateProductResponse,
} from './dto/update-product.dto';
import {
  DeleteProductParams,
  DeleteProductResponse,
} from './dto/delete-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(USER_ROLE.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/add')
  async addProduct(@Body() body: AddProductBody): Promise<AddProductResponse> {
    return await this.productsService.addProduct(body);
  }

  @Roles(USER_ROLE.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/list')
  async getProductsList(
    @Body() body: GetProductsListBody,
  ): Promise<GetProductsListResponse> {
    return await this.productsService.getProductsList(body);
  }

  @Roles(USER_ROLE.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/update/:id')
  async updateProduct(
    @Body() body: UpdateProductBody,
    @Param() param: UpdateProductParams,
  ): Promise<UpdateProductResponse> {
    return await this.productsService.updateProduct(param.id, body);
  }

  @Roles(USER_ROLE.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  async deleteProduct(
    @Param() param: DeleteProductParams,
  ): Promise<DeleteProductResponse> {
    return await this.productsService.deleteProduct(param.id);
  }

  @Roles(USER_ROLE.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:id')
  async getProduct(
    @Param() param: GetProductParams,
  ): Promise<GetProductResponse> {
    return await this.productsService.getProduct(param.id);
  }
}

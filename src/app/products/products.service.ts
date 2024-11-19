import { Injectable } from '@nestjs/common';
import { ProductsRepo } from './products.repo';
import {
  AddProductBody,
  AddProductResponse,
  SaveProductInput,
} from './dto/add-product.dto';
import { ulid } from 'ulid';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepo: ProductsRepo) {}

  async addProduct(body: AddProductBody): Promise<AddProductResponse> {
    const productInput: SaveProductInput = {
      id: ulid(),
      ...body,
    };
    await this.productsRepo.addProduct(productInput);

    return {
      message: 'Product added successfully',
    };
  }
}

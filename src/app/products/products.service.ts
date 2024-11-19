import { Injectable } from '@nestjs/common';
import { ProductsRepo } from './products.repo';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepo: ProductsRepo) {}
}

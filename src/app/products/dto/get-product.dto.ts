import { IsNotEmpty, IsString } from 'class-validator';
import { ProductEntity } from '../entities/products.entity';

export class GetProductParams {
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class GetProductResponse {
  product: ProductEntity;
}

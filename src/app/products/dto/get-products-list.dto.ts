import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ProductEntity } from '../entities/products.entity';

export class GetProductsListBody {
  @IsNumber()
  @IsOptional()
  @Min(1)
  page = 1;

  @IsNumber()
  @IsOptional()
  limit = 16;

  @IsOptional()
  @IsString()
  search?: string;
}

export class GetProductsListResponse {
  totalCount: number;
  products: ProductEntity[];
  totalPages: number;
  page: number;
  limit: number;
}

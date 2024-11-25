import { ProductEntity } from '../entities/products.entity';
import { GetProductsListQuery } from './get-products-list.dto';

export class GetUserProductsListQuery extends GetProductsListQuery {}

export class GetUserProductsListResponse {
  totalCount: number;
  hasMore: boolean;
  products: ProductEntity[];
}

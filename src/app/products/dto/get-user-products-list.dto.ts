import { ProductEntity } from '../entities/products.entity';
import { GetProductsListBody } from './get-products-list.dto';

export class GetUserProductsListBody extends GetProductsListBody {}

export class GetUserProductsListResponse {
  totalCount: number;
  hasMore: boolean;
  products: ProductEntity[];
}

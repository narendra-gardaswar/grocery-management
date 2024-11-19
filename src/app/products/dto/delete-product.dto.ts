import { GetProductParams } from './get-product.dto';
import { UpdateProductResponse } from './update-product.dto';

export class DeleteProductParams extends GetProductParams {}

export class DeleteProductResponse extends UpdateProductResponse {}

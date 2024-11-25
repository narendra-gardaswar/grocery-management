import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class OrderedProductDTO {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class CreateOrderBody {
  @Type(() => OrderedProductDTO)
  @ValidateNested({ each: true })
  @IsArray()
  orderedProducts: OrderedProductDTO[];
}

export class CreateOrderResponse {
  message: string;
}

export class SaveOrderedProductInput {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  pricePerUnit: string;
  totalPrice: string;
}

export class SaveOrderInput {
  id: string;
  userId: string;
  totalPrice: string;
}

export class UpdateProductInput {
  productId: string;
  stockQuantity: number;
}

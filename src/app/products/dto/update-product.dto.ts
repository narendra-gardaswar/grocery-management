import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { GetProductParams } from './get-product.dto';

export class UpdateProductBody {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumberString()
  price?: string;

  @IsOptional()
  @IsNumber()
  stockQuantity?: number;
}

export class UpdateProductParams extends GetProductParams {}

export class UpdateProductResponse {
  message: string;
}

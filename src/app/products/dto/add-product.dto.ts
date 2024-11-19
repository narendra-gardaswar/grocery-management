import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class AddProductBody {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  price: string;

  @IsNotEmpty()
  @IsNumber()
  stockQuantity: number;
}

export class AddProductResponse {
  message: string;
}

export class SaveProductInput {
  id: string;
  name: string;
  price: string;
  stockQuantity: number;
}

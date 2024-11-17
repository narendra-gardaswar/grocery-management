import { NormalizeEmail } from '@core/decorators';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../entities/users.entity';

export class RegisterUserBody {
  @IsNotEmpty()
  @IsEmail()
  @NormalizeEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  fullName: string;
}

export class RegisterUserResponse {
  id: string;
}

export class SaveUserInput {
  id: string;
  role: UserRole;
  email: string;
  password: string;
  full_name: string;
}

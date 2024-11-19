import { NormalizeEmail } from '@core/decorators';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { USER_ROLE, UserRole } from '../entities/users.entity';
import { RegisterUserResponse } from './register-user.dto';

export class LoginUserBody {
  @IsNotEmpty()
  @IsEmail()
  @NormalizeEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsEnum(USER_ROLE)
  role: UserRole;
}

export class LoginUserResponse extends RegisterUserResponse {}

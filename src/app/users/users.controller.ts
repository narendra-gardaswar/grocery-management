import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  RegisterUserBody,
  RegisterUserResponse,
} from './dto/register-user.dto';
import { LoginUserBody, LoginUserResponse } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async registerUser(
    @Body() body: RegisterUserBody,
  ): Promise<RegisterUserResponse> {
    return await this.usersService.registerUser(body);
  }

  @Post('/login')
  async loginUser(@Body() body: LoginUserBody): Promise<LoginUserResponse> {
    return await this.usersService.loginUser(body);
  }
}

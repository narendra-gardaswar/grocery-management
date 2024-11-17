import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  RegisterUserBody,
  RegisterUserResponse,
} from './dto/register-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async registerUser(
    @Body() body: RegisterUserBody,
  ): Promise<RegisterUserResponse> {
    return await this.usersService.registerUser(body);
  }
}

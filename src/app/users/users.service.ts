import { Injectable } from '@nestjs/common';
import {
  RegisterUserBody,
  RegisterUserResponse,
  SaveUserInput,
} from './dto/register-user.dto';
import { UsersRepo } from './users.repo';
import { USER_ROLE } from './entities/users.entity';
import { ulid } from 'ulid';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepo) {}

  async registerUser(body: RegisterUserBody): Promise<RegisterUserResponse> {
    const saveUserInput: SaveUserInput = {
      id: ulid(),
      role: USER_ROLE.USER,
      email: body.email,
      password: body.password,
      full_name: body.fullName,
    };
    const user = await this.usersRepo.createUser(saveUserInput);
    return {
      id: user.id,
    };
  }
}

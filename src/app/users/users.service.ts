import { BadRequestException, Injectable } from '@nestjs/common';
import {
  RegisterUserBody,
  RegisterUserResponse,
  SaveUserInput,
} from './dto/register-user.dto';
import { UsersRepo } from './users.repo';
import { USER_ROLE } from './entities/users.entity';
import { ulid } from 'ulid';
import { AuthService } from '@core/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepo,
    private readonly authService: AuthService,
  ) {}

  async registerUser(body: RegisterUserBody): Promise<RegisterUserResponse> {
    const existingUser = await this.usersRepo.getUserByEmail(body.email);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = this.authService.hashPassword(body.password);

    const saveUserInput: SaveUserInput = {
      id: ulid(),
      role: USER_ROLE.USER,
      email: body.email,
      password: hashedPassword,
      full_name: body.fullName,
    };

    const user = await this.usersRepo.createUser(saveUserInput);
    const userTokens = await this.authService.getUserTokens(user);

    return {
      ...userTokens,
    };
  }
}

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
import { LoginUserBody, LoginUserResponse } from './dto/login-user.dto';

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
      fullName: body.fullName,
    };

    const user = await this.usersRepo.createUser(saveUserInput);
    const userTokens = await this.authService.getUserTokens(user);

    return {
      ...userTokens,
    };
  }

  async loginUser(body: LoginUserBody): Promise<LoginUserResponse> {
    const user = await this.usersRepo.getUserByEmailAndRole(
      body.email,
      body.role,
    );

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordValid = this.authService.compareHash(
      body.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    const userTokens = await this.authService.getUserTokens(user);

    return {
      ...userTokens,
    };
  }
}

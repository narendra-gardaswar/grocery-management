import { UserEntity } from '@users/entities/users.entity';
import { EnvironmentVariables } from '@core/configs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserTokens } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  private readonly accessTokenExpiration = 86400; // 1 day

  validateApiKey(providedApiKey: string): boolean {
    const apiKey = this.configService.getOrThrow<string>(
      EnvironmentVariables.API_KEY,
    );

    if (!providedApiKey || apiKey !== providedApiKey) {
      throw new ForbiddenException('Access Denied');
    }
    return true;
  }

  hashPassword(password: string): string {
    const saltOrRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltOrRounds);
    return passwordHash;
  }

  compareHash(data: string, hash: string): boolean {
    return bcrypt.compareSync(data, hash);
  }

  private async getAccessToken(
    user: UserEntity,
    expiration: number,
  ): Promise<string> {
    const payload = {
      id: user.id,
      role: user.role,
    };

    return await this.jwtService.signAsync(payload, {
      subject: user.id,
      expiresIn: expiration,
    });
  }

  async getUserTokens(user: UserEntity): Promise<UserTokens> {
    const expiration = this.accessTokenExpiration;
    const accessToken = await this.getAccessToken(user, expiration);
    return {
      id: user.id,
      role: user.role,
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: expiration,
    };
  }
}

import { EnvironmentVariables } from '@core/configs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  validateApiKey(providedApiKey: string): boolean {
    const apiKey = this.configService.getOrThrow<string>(
      EnvironmentVariables.API_KEY,
    );

    if (!providedApiKey || apiKey !== providedApiKey) {
      throw new ForbiddenException('Access Denied');
    }
    return true;
  }
}

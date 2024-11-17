import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@core/configs/config';
import { UserRole } from '@users/entities/users.entity';

export class LoggedInUser {
  id: string;
  role: UserRole;
  sub: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>(
        EnvironmentVariables.JWT_SECRET,
      ),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, user: LoggedInUser): Promise<LoggedInUser> {
    return user;
  }
}

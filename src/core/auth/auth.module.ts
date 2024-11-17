import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import jwtOptions from './jwt/jwt-config';
import { JwtStrategy } from './jwt/jwt-strategy';
import { AuthGuardType } from '@core/constants';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: AuthGuardType.JWT }),
    JwtModule.registerAsync(jwtOptions),
  ],
  controllers: [],
  providers: [JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}

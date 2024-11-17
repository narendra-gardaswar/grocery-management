import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import jwtOptions from './jwt/jwt-config';
import { JwtStrategy } from './jwt/jwt-strategy';

@Module({
  imports: [PassportModule, JwtModule.registerAsync(jwtOptions)],
  controllers: [],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

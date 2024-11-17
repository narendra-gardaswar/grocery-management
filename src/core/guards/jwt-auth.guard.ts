import { AuthGuardType } from '@core/constants';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthGuardType.JWT) {}

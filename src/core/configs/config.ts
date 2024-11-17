import { ConfigModuleOptions } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

export const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  validate,
};

export enum Environment {
  LOCAL = 'local',
  Development = 'development',
}

export enum EnvironmentVariables {
  NODE_ENV = 'NODE_ENV',
  PORT = 'PORT',
  JWT_SECRET = 'JWT_SECRET',
  API_KEY = 'API_KEY',
  POSTGRES_URL = 'POSTGRES_URL',
}

export class EnvironmentVariable {
  @IsEnum(Environment)
  @IsNotEmpty()
  NODE_ENV: Environment;

  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  API_KEY: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_URL: string;
}

export function validate(config: Record<string, unknown>): EnvironmentVariable {
  const validatedConfig = plainToInstance(EnvironmentVariable, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

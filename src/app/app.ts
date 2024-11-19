import { NestExpressApplication } from '@nestjs/platform-express';
import { Environment, EnvironmentVariables } from '@core/configs/config';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ApiGuard } from '@core/guards/api.guard';
import { AuthService } from '@core/auth/auth.service';
import { ErrorResponse } from '@core/filters/all-exception-filter';

function parseValidationErrors(errors: ValidationError[]): string[] {
  let messages: string[] = [];
  function parse(errors: ValidationError[]): void {
    errors.forEach(($error) => {
      if ($error.children && $error.children.length) {
        parse($error.children);
      } else {
        if ($error.constraints) {
          const errors: string[] = Object.values($error.constraints);
          messages = [...messages, ...errors];
        }
      }
    });
  }
  parse(errors);
  return messages;
}

// change default validation error response
export const validationPipe = new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidUnknownValues: true,
  exceptionFactory: (validationErrors) => {
    const [validationError] = validationErrors;
    let constraints = [];
    constraints = parseValidationErrors(validationErrors);
    if (validationError.constraints) {
      constraints = Object.values(validationError.constraints as object);
    }
    const errorMessage: ErrorResponse = {
      message: constraints[0] || '',
      status: 400,
    };
    return new BadRequestException(errorMessage);
  },
});

export default async function (
  app: NestExpressApplication,
  configService: ConfigService,
): Promise<void> {
  const nodeEnv = configService.getOrThrow<string>(
    EnvironmentVariables.NODE_ENV,
  );
  const isLocal = nodeEnv === Environment.LOCAL;

  if (!isLocal) {
    app.use(helmet());
  }

  app.enableCors({ origin: '*' });
  app.useGlobalPipes(validationPipe);

  const authService = app.get(AuthService);
  app.useGlobalGuards(new ApiGuard(authService));
}

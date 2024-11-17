import { NestExpressApplication } from '@nestjs/platform-express';
import { Environment, EnvironmentVariables } from '@core/configs/config';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

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

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      whitelist: true,
    }),
  );
}

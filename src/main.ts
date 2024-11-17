import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { EnvironmentVariables } from '@core/configs/config';
import configureApp from '@app/app';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const logger = app.get(Logger);
  const port = configService.getOrThrow<string>(EnvironmentVariables.PORT);
  await configureApp(app, configService);
  await app.listen(port, () => {
    logger.log(`Server Started. Listening on Port: ${port}`);
  });
}

bootstrap();

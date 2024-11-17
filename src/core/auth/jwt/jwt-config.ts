import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@core/configs/config';

const jwtOptions: JwtModuleAsyncOptions = {
  useFactory: async (config: ConfigService) => ({
    secret: config.getOrThrow(EnvironmentVariables.JWT_SECRET),
  }),
  inject: [ConfigService],
};
export default jwtOptions;

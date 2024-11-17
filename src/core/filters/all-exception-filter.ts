import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
export interface ErrorResponse {
  status: number;
  message: string;
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  constructor(readonly httpAdapterHost: HttpAdapterHost) {
    super();
  }
  catch(exception: HttpException, host: ArgumentsHost): void {
    this.logger.error(exception.stack);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
    }

    const errorResponse: ErrorResponse = {
      status,
      message,
    };
    const ctx = host.switchToHttp();
    this.httpAdapterHost.httpAdapter.reply(
      ctx.getResponse(),
      errorResponse,
      errorResponse.status,
    );
  }
}

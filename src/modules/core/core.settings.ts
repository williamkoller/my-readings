import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

export const providers = [
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TimeoutInterceptor,
  },
];

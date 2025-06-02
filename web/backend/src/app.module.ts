import { PrismaModule } from '@db/prisma.module';
import { CacheModule } from '@nestjs/cache-manager';
import {
  Logger, MiddlewareConsumer, Module, NestModule
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';

import { configLoaders, IEnv } from '@config/index';

import { ProxyThrottler } from '@common/guards/throttler.guard';
import { CaptureRequestMiddleware } from '@common/middlewares/capture.middleware';

import { AppController } from './app.controller';
import AppRoutes from './app.routes';
import { AppService } from './app.service';
import { AccessTokenGuard } from './auth/accessToken.guard';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configLoaders,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const envConfig = configService.get<IEnv>('env')!;
        return [
          {
            ttl: envConfig.limiter.ttl,
            limit: envConfig.limiter.limit,
          },
        ];
      },
      inject: [ConfigService],
    }),

    CacheModule.register({
      isGlobal: true
    }),
    ScheduleModule.forRoot(),

    PrismaModule,

    UsersModule,
    AuthModule,

    RouterModule.register(AppRoutes),

  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ProxyThrottler,
    },
    AppService, ConfigService
  ],
})
export class AppModule implements NestModule {
  private readonly logger = new Logger(AppModule.name);

  constructor(
    private readonly configService: ConfigService, // private readonly appService: AppService,
  ) { }

  configure(consumer: MiddlewareConsumer) {
    const middleware = new CaptureRequestMiddleware(
      this.logger,
      this.configService,
    );
    consumer.apply(middleware.use.bind(middleware)).forRoutes('*');
    // NOTE : Request capture MiddleWare
  }
}

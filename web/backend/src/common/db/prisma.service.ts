import {
  BeforeApplicationShutdown, Injectable, Logger, OnModuleInit
} from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements BeforeApplicationShutdown, OnModuleInit {
  async onModuleInit() {
    Logger.warn('onModuleInit: prisma connect');
    await this.$connect();
  }

  async beforeApplicationShutdown() {
    Logger.warn('onApplicationShutdown: prisma disconnect');
    await this.$disconnect();
  }
}

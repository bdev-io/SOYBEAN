import { Global, Module } from "@nestjs/common";

import { PrismaService } from "./prisma.service";

// 한개의 모듈에서 import 하면 전역에서 사용 가능
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule { }

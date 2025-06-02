import { PrismaService } from '@db/prisma.service';
import {
  CanActivate, ExecutionContext, HttpStatus, Injectable, mixin, Type 
} from '@nestjs/common';

import type { Request } from "express";

import { SPACE_ID_HEADER } from '@constant/request.constant';
import { ROLE } from '@constant/role.constant';
import { KError } from '@error/error.handler';

import { SpaceContext } from '@type/context.type';
import { Role } from '@type/role.type';

interface SpaceExistGuardOptions {
  adminOnly?: boolean;
}

export function SpaceExistGuard(options?: SpaceExistGuardOptions): Type<CanActivate> {
  @Injectable()
  class MixinSpaceExistGuard implements CanActivate {
    constructor(private readonly prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request: Request = context.switchToHttp().getRequest();
      const spaceId = request.get(SPACE_ID_HEADER);

      if (!spaceId) {
        throw new KError(
          '스페이스 정보가 없습니다.',
          HttpStatus.BAD_REQUEST,
          'NO_SPACE_ID'
        );
      }

      if (!request.user) {
        return false;
      }

      const user = request.user as any;
      if (user.userId === undefined || user.username === undefined) {
        throw new KError(
          '유저 정보가 없습니다.',
          HttpStatus.UNAUTHORIZED,
          'UNAUTHORIZED_USER',
        );
      }

      const suMap = await this.prisma.spacesUsersMap.findFirst({
        where: {
          spaceId,
          userId: user.userId,
        },
      });

      if (!suMap) {
        throw new KError(
          '스페이스에 접근할 권한이 없습니다.',
          HttpStatus.FORBIDDEN,
          'NO_PERMISSION',
        );
      }

      const role = suMap.role as Role;

      if (options && options.adminOnly && role === ROLE.MEMBER) {
        throw new KError(
          '접근 권한이 없습니다.',
          HttpStatus.FORBIDDEN,
          'NO_PERMISSION',
        );
      }

      const spaceContext: SpaceContext = {
        spaceId,
        userId: user.userId,
        role,
      };

      request.spaceContext = spaceContext;

      return true;
    }
  }

  return mixin(MixinSpaceExistGuard);
}

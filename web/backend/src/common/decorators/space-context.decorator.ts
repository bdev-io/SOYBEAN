import type { ExecutionContext } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common";

import type { Request } from "express";

import type { SpaceContext } from "@type/context.type";

export const ReqSpaceContext = createParamDecorator((_: unknown, ctx: ExecutionContext): SpaceContext | undefined => {
  const request: Request = ctx.switchToHttp().getRequest();
  if (!request.spaceContext) {
    return undefined;
  }

  return request.spaceContext;
});

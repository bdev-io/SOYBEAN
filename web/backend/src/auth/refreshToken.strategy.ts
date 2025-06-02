import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

import type { Request } from 'express';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { IEnv } from "@config/index";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(configService: ConfigService) {
    const envConfig = configService.get<IEnv>('env')!;

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies?.refreshToken,
        (req: Request) => req.cookies?.refresh_token,
      ]),
      ignoreExpiration: false,
      algorithms: [envConfig.refreshToken.signOptions.algorithm as any],
      secretOrKey: envConfig.refreshToken.secretOrPrivateKey, // NOTE: PRIVATE KEY / SECRET KEY 설정 해야함.
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken =
      req.cookies?.refreshToken || req.cookies?.refresh_token;
    return {
      userId: payload.sub, username: payload.username, refreshToken
    };
  }
}

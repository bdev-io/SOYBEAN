import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt, Strategy } from "passport-jwt";

import { IEnv } from "@config/index";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    const envConfig = configService.get<IEnv>('env')!;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: [envConfig.accessToken.signOptions.algorithm as any],
      secretOrKey: envConfig.accessToken.secretOrPrivateKey, // NOTE: PRIVATE KEY / SECRET KEY 설정 해야함.
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub, username: payload.username
    };
  }
}

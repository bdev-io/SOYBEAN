import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

import { HttpStatus, KError } from '@error/error.handler';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUserPlain(username, password);
    if (!user) {
      throw new KError('아이디 혹은 비밀번호가 유효하지 않습니다.', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}

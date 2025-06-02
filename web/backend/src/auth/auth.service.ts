import { BadRequestException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import argon2 from 'argon2';

import { IEnv } from "@config/env.config";
import { KError } from "@error/error.handler";

import { UsersService } from "@src/users/users.service";
import { hashPassword } from "@util/password.util";

import { Prisma, Users } from "@prisma/client";

import { RegisterUserDto } from "./dto/register-user.dto";

@Injectable()
export class AuthService {
  private accessTokenConfig: IEnv['accessToken'];
  private refreshTokenConfig: IEnv['refreshToken'];
  private appHost: IEnv['host'];

  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    const envConfig = this.configService.get<IEnv>('env')!;

    this.appHost = envConfig.host;
    this.accessTokenConfig = envConfig.accessToken;
    this.refreshTokenConfig = envConfig.refreshToken;
  }

  /**
   * 사용자 등록을 처리하는 메서드
   * @param reqBody 사용자 등록 정보가 담긴 요청 본문
   * @returns 생성된 사용자 객체를 반환하는 Promise
   */
  async registerAction(reqBody: RegisterUserDto): Promise<Users> {
    const {
      name, username, password
    } = reqBody;

    const usernameExist = await this.usersService.checkUserExist(username);
    if (usernameExist) {
      throw new KError('이미 존재하는 아이디입니다.', HttpStatus.CONFLICT, 'ALREADY_EXIST_USER')
    }

    const hashedPassword = await hashPassword(password);

    const partialUser: Prisma.UsersCreateInput = {
      name,
      username,
      hash: hashedPassword
    };
    const createdUser = await this.usersService.createFromPartialUser(partialUser);

    return createdUser;
  }

  /**
   * 사용자명과 비밀번호를 검증하여 사용자 인증을 처리하는 메서드
   * @param username 인증할 사용자의 사용자명
   * @param password 인증할 사용자의 비밀번호
   * @returns 인증된 사용자 객체 (해시값 제외)를 반환하는 Promise
   */
  // NOTE: local strategy 중간 과정, 인증 진행.
  async validateUserPlain(username: string, password: string): Promise<Omit<Users, 'hash'>> {
    // NOTE: 회원 인증 로직
    const user = await this.usersService.getUserByUsername(username);
    if (!user) {
      throw new KError(
        '존재하지 않는 사용자입니다.',
        HttpStatus.NOT_FOUND,
        'NOT_FOUND_USER',
        {
        }
      );
    }

    const {
      hash, ...restOfUser
    } = user;

    const passwordMatched = await argon2.verify(hash, password);
    if (!passwordMatched) {
      throw new BadRequestException('비밀번호가 틀렸습니다.');
    }

    return restOfUser;
  }

  /**
   * 사용자 정보를 기반으로 액세스 토큰을 생성하는 메서드
   * @param user 토큰을 생성할 사용자 객체
   * @returns 생성된 JWT 액세스 토큰 문자열을 반환하는 Promise
   */
  async generateAccessToken(user: Users): Promise<string> {
    const accessToken = await this.jwtService.signAsync({
      sub: user.uuid,
      username: user.username,
    },
    {
      secret: this.accessTokenConfig.secretOrPrivateKey,
      privateKey: this.accessTokenConfig.secretOrPrivateKey, // NOTE : PRIVATE KEY / SECRET KEY 선택적으로 적용 하기
      expiresIn: this.accessTokenConfig.signOptions.expiresIn,
      algorithm: this.accessTokenConfig.signOptions.algorithm as any,
      issuer: this.appHost,
    }
    );

    return accessToken;
  }

  /**
   * 사용자 정보를 기반으로 리프레시 토큰을 생성하는 메서드
   * @param user 토큰을 생성할 사용자 객체
   * @returns 생성된 JWT 리프레시 토큰 문자열을 반환하는 Promise
   */
  async generateRefreshToken(user: Users): Promise<string> {
    const refreshToken = await this.jwtService.signAsync({
      sub: user.uuid,
      username: user.username,
    },
    {
      secret: this.refreshTokenConfig.secretOrPrivateKey,
      privateKey: this.refreshTokenConfig.secretOrPrivateKey, // NOTE : PRIVATE KEY / SECRET KEY 선택적으로 적용 하기
      expiresIn: this.refreshTokenConfig.signOptions.expiresIn,
      algorithm: this.refreshTokenConfig.signOptions.algorithm as any,
      issuer: this.appHost,
    });

    return refreshToken;
  }

  /**
   * 사용자 정보를 기반으로 액세스 토큰과 리프레시 토큰을 동시에 생성하는 메서드
   * @param user 토큰을 생성할 사용자 객체
   * @returns 생성된 액세스 토큰과 리프레시 토큰을 포함한 객체를 반환하는 Promise
   */
  private async getTokens(user: Users): Promise<{ accessToken: string, refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]);

    return {
      accessToken, refreshToken
    };
  }

  // NOTE: local strategy 마지막 과정, 토큰 발급
  /**
   * 로컬 전략을 통해 인증된 사용자에게 액세스 토큰과 리프레시 토큰을 발급하는 메서드
   * @param user 토큰을 발급받을 사용자 객체 (선택적)
   * @returns 생성된 액세스 토큰과 리프레시 토큰을 포함한 객체를 반환하는 Promise
   */
  async localStrategyGenerateToken(user?: Users): Promise<{ accessToken: string, refreshToken: string }> {
    // Check if user exists
    if (!user) {
      throw new BadRequestException('존재하지 않는 사용자입니다.');
    }
    const tokens = await this.getTokens(user);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}

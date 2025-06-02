import { PrismaService } from "@db/prisma.service";
import { HttpStatus, Injectable, Logger } from "@nestjs/common";

import { KError } from "@error/error.handler";

import { hashPassword } from "@util/password.util";

import { Prisma, Users } from "@prisma/client";
import { MyContext } from "@type/context.type";
import { Role } from "@type/role.type";

import { PatchUserDto } from "./dto/patch-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";
import { userWithSpacesMap, UserWithSpacesMapType } from "./types/users.types";


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  /**
   * 사용자명으로 사용자를 조회합니다
   * @param username 조회할 사용자명
   * @returns 사용자 객체 또는 null (사용자가 없는 경우)
   */
  async getUserByUsername(username: string): Promise<null | Users> {
    const user = await this.prisma.users.findFirst({
      where: {
        username
      }
    });

    return user;
  }

  /**
   * 사용자명으로 사용자 존재 여부를 확인합니다
   * @param username 확인할 사용자명
   * @returns 사용자 존재 여부 (true: 존재, false: 존재하지 않음)
   */
  async checkUserExist(username: string): Promise<boolean> {
    const user = await this.getUserByUsername(username);

    return !!user;
  }

  /**
   * 부분 사용자 정보로 새 사용자를 생성합니다
   * @param partialUser 생성할 사용자의 부분 정보
   * @returns 생성된 사용자 객체
   */
  async createFromPartialUser(partialUser: Prisma.UsersCreateInput): Promise<Users> {
    try {
      const user = await this.prisma.users.create({
        data: {
          ...partialUser
        }
      });

      return user;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new KError(
          '이미 존재하는 아이디입니다.',
          HttpStatus.CONFLICT,
          'ALREADY_EXISTS_USER',
        );
      }

      Logger.error(e);
      throw new KError(
        '알수없는 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
        'INTERNAL_SERVER_ERROR',
        {
        }
      )
    }
  }

  /**
   * 사용자 ID와 스페이스 ID로 스페이스 매핑 정보가 포함된 사용자를 조회합니다
   * @param userId 조회할 사용자 ID
   * @param spaceId 필터링할 스페이스 ID
   * @returns 스페이스 매핑 정보가 포함된 사용자 객체 또는 null (사용자가 없는 경우)
   */
  async getUserById(userId: string): Promise<null | Users> {
    const user = await this.prisma.users.findFirst({
      where: {
        uuid: userId,
      },
    });

    return user;
  }

  /**
   * 사용자 정보를 응답용 DTO로 변환합니다
   * @param user 스페이스 매핑 정보가 포함된 사용자 객체
   * @returns 사용자 응답 DTO 객체
   */
  private toUserResponseDto(user: UserWithSpacesMapType): UserResponseDto {
    const userResponse: UserResponseDto = {
      uuid: user.uuid,
      name: user.name,
      username: user.username,
      role: user.SpacesUsersMap[0]!.role as Role,
      position: user.SpacesUsersMap[0]!.position,
    };
    return userResponse;
  }

  async getMe(myContext: MyContext): Promise<UserResponseDto> {
    const {userId} = myContext;

    const user = await this.getUserById(userId);

    if (!user || user.SpacesUsersMap.length === 0) {
      throw new KError(
        '존재하지 않는 사용자입니다.',
        HttpStatus.NOT_FOUND,
        'NOT_FOUND_USER',
      );
    }

    return this.toUserResponseDto(user);
  }

  /**
   * 사용자의 비밀번호를 변경합니다
   * @param userId 비밀번호를 변경할 사용자 ID
   * @param password 새로운 비밀번호
   */
  private async changePassword(userId: string, password: string) {
    const hashedPassword = await hashPassword(password);

    await this.prisma.users.update({
      where: {
        uuid: userId
      },
      data: {
        hash: hashedPassword
      }
    });
  }

  /**
   * 사용자의 스페이스 내 직위를 변경합니다
   * @param userId 직위를 변경할 사용자 ID
   * @param spaceId 스페이스 ID
   * @param position 새로운 직위
   */
  private async changePosition(userId: string, spaceId: string, position: string) {
    await this.prisma.spacesUsersMap.updateMany({
      where: {
        spaceId,
        userId,
      },
      data: {
        position
      }
    });
  }

  /**
   * 현재 사용자의 정보를 수정합니다
   * @param spaceContext 스페이스 ID와 사용자 ID가 포함된 스페이스 컨텍스트
   * @param patchUserDto 수정할 사용자 정보가 포함된 DTO
   */
  async patchMe(spaceContext: SpaceContext, patchUserDto: PatchUserDto) {
    const {
      spaceId, userId
    } = spaceContext;

    const user = await this.getUserById(userId);
    if (!user || user.SpacesUsersMap.length === 0) {
      throw new KError(
        '존재하지 않는 사용자입니다.',
        HttpStatus.NOT_FOUND,
        'NOT_FOUND_USER',
      );
    }

    try {
      if (patchUserDto.password) {
        // NOTE: 비밀번호 변경
        await this.changePassword(userId, patchUserDto.password);
      }

      if (patchUserDto.position) {
        // NOTE: 직위 변경
        await this.changePosition(userId, spaceId, patchUserDto.position);
      }
    } catch (e) {
      Logger.error(e);
      throw new KError(
        '유저 업데이트에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
        'INTERNAL_SERVER_ERROR'
      )
    }
  }

}

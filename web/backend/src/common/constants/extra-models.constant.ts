import { UserResponseDto } from '@src/users/dto/user-response.dto';

import { DeleteResultDto, FailedItemDto } from '@type/dto/delete-result.dto';
import { PaginationRetType } from '@type/pagination.type';

const DELETE_RESULT_MODELS = [
  DeleteResultDto,
  FailedItemDto,
];

const PAGINATION_MODELS = [
  PaginationRetType,
];

const usersModels = [
  UserResponseDto
];


// swagger extra model 추가하기 위함
export const EXTRA_MODELS = [
  ...DELETE_RESULT_MODELS,
  ...PAGINATION_MODELS,
  ...usersModels,
];

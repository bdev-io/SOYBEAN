import { Validate, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

/**
 * 연도 범위 유효성 검사 데코레이터
 */
export function IsValidYearRange() {
  return Validate(IsValidYearRangeConstraint);
}

@ValidatorConstraint({
  name: 'isValidYearRange',
  async: false 
})
export class IsValidYearRangeConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    // "YYYY~YYYY", "YYYY~", "~YYYY" 허용
    const match = /^(\d{4})?~(\d{4})?$/.exec(value);

    if (!match) {
      return false;
    }

    const start = match[1] ? Number(match[1]) : undefined;
    const end = match[2] ? Number(match[2]) : undefined;

    // 시작 연도와 종료 연도가 둘다 없는 경우
    if (start === undefined && end === undefined) {
      return false;
    }

    // 범위 검사: 1000~3000
    if (start !== undefined && (start < 1000 || start > 3000)) {
      return false;
    }
    if (end !== undefined && (end < 1000 || end > 3000)) {
      return false;
    }

    // 시작 연도와 종료 연도 모두 존재할 경우, 시작이 종료보다 커서는 안 됨
    if (start !== undefined && end !== undefined && start > end) {
      return false;
    }
    
    return true;
  }

  defaultMessage(): string {
    return '연도 범위는 [YYYY~YYYY, YYYY~, ~YYYY] 형식이어야 하며, 연도는 1000~3000 사이여야 하고 시작 연도는 종료 연도보다 작거나 같아야 합니다.';
  }
}
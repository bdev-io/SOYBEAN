'use client';

import type { HTMLAttributes } from 'react';

import usePageParams from '@hook/usePageParams';
import { cn } from '@lib/utils';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@comp/ui/pagination';

export type PaginationGroupProps = {
  /** 전체 페이지 수 (필수) */
  totalPage: number;
  /** 페이지 변경 시 스크롤을 상단으로 올릴지 여부 (기본값: true) */
  isScroll?: boolean;
  /** 표시할 페이지 수 (기본값: 5) */
  displayPage?: number;
  /** 이전/다음 화살표 버튼을 표시할지 여부 (기본값: true) */
  displayArrow?: boolean;
};

/**
 * PaginationGroup 컴포넌트
 *
 * 페이지네이션 UI를 구성하는 컴포넌트입니다.
 * `usePageParams` 훅과 연결되어 있으며, 현재 페이지 상태를 관리하고
 * 페이지 전환 시 스크롤을 최상단으로 이동할 수 있는 옵션도(optional) 포함합니다.
 *
 * @example
 * ```tsx
 * <PaginationGroup
 *   totalPage={20}
 *   scrollTop={true}
 *   displayPage={5}
 *   displayArrow={true}
 *   className=""
 * />
 * ```
 */
export function PaginationGroup({
  totalPage,
  isScroll = true,
  displayPage = 5,
  displayArrow = true,
  className,
  ...props
}: PaginationGroupProps & HTMLAttributes<HTMLDivElement>) {
  const { page, handlePage } = usePageParams({ isScroll });

  if (Number.isNaN(totalPage)) return null;

  const handlePrevious = () => {
    if (page <= 1) return;
    handlePage(page - 1);
  };

  const handleNext = () => {
    if (page >= totalPage) return;
    handlePage(page + 1);
  };

  const generatePages = () => {
    // 총 페이지가 표시할 수 있는 페이지보다 작거나 같으면 모든 페이지를 표시
    if (totalPage <= displayPage) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    const result: (number | string)[] = [];
    const sidePages = Math.floor(displayPage / 2);

    // 1. 항상 첫 페이지 추가
    result.push(1);

    // 2. 현재 페이지가 앞쪽에 가까운 경우
    if (page <= sidePages + 1) {
      // 첫 페이지부터 displayPage-1개 페이지 추가
      for (let i = 2; i <= displayPage - 1; i++) {
        result.push(i);
      }
      // 생략 표시 추가
      result.push('ellipsis');
      // 마지막 페이지 추가
      result.push(totalPage);
      return result;
    }

    // 3. 현재 페이지가 뒤쪽에 가까운 경우
    if (page > totalPage - sidePages) {
      // 생략 표시 추가
      result.push('ellipsis');
      // 마지막 페이지 앞에 displayPage-1개 페이지 추가
      for (let i = totalPage - displayPage + 2; i < totalPage; i++) {
        result.push(i);
      }
      // 마지막 페이지 추가
      result.push(totalPage);
      return result;
    }

    // 4. 현재 페이지가 중간에 있는 경우
    result.push('ellipsis');

    // 현재 페이지 앞뒤로 페이지 추가
    for (let i = page - sidePages + 1; i <= page + sidePages - 1; i++) {
      if (i > 1 && i < totalPage) {
        result.push(i);
      }
    }

    result.push('ellipsis');
    result.push(totalPage);

    return result;
  };

  const pages = generatePages();

  return (
    <div className={cn(className)} {...props}>
      <Pagination aria-label='Pagination'>
        <PaginationContent>
          {displayArrow && (
            <PaginationItem className='flex-center size-[32px]'>
              <PaginationPrevious
                aria-disabled={page === 1}
                onClick={handlePrevious}
                className={cn(
                  'cursor-pointer aria-disabled:[&_svg]:opacity-30',
                  {
                    'cursor-not-allowed': page === 1,
                  },
                )}
              />
            </PaginationItem>
          )}

          {pages.map((i, idx) =>
            i === 'ellipsis' ? (
              <PaginationItem
                // eslint-disable-next-line react/no-array-index-key
                key={`ellipsis-${idx}`}
                className='flex-center size-[32px]'
              >
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem
                key={`page-${i}`}
                className='flex-center size-[32px]'
              >
                <PaginationLink
                  onClick={() => handlePage(i as number)}
                  aria-current={i === page}
                  className={cn(
                    'flex-center hover:bg-gray-5 aria-current:bg-gray-10 size-full cursor-pointer',
                    {
                      'font-bold': i === page,
                    },
                  )}
                >
                  {i}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          {displayArrow && (
            <PaginationItem className='flex-center size-[32px]'>
              <PaginationNext
                aria-disabled={page === totalPage}
                onClick={handleNext}
                className={cn(
                  'cursor-pointer aria-disabled:[&_svg]:opacity-30',
                  {
                    'cursor-not-allowed': page === totalPage,
                  },
                )}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

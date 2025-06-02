'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import * as React from 'react';

import IconArrow from '@comp/icons/IconArrow';

import { cn } from '@src/lib/utils';

/**
 * Select 컴포넌트 - 드롭다운 선택 기능을 제공하는 컴포넌트
 *
 * @description
 * Select 컴포넌트는 Radix UI의 Select를 기반으로 구현되었으며,
 * 사용자가 여러 옵션 중 하나를 선택할 수 있는 인터페이스를 제공합니다.
 *
 * 구성 요소:
 * - SelectTrigger: 선택 영역을 표시하는 트리거
 * - SelectValue: 선택된 값을 표시
 * - SelectContent: 옵션 목록을 포함하는 드롭다운
 * - SelectItem: 개별 선택 옵션
 * - SelectGroup: 옵션들을 그룹화
 * - SelectLabel: 그룹의 레이블
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <Select>
 *   <SelectTrigger>
 *     <SelectValue placeholder="선택해주세요" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="1">옵션 1</SelectItem>
 *     <SelectItem value="2">옵션 2</SelectItem>
 *   </SelectContent>
 * </Select>
 *
 * // 그룹화 사용
 * <Select>
 *   <SelectTrigger className="w-[200px]">
 *     <SelectValue placeholder="카테고리 선택" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectGroup>
 *       <SelectLabel>과일</SelectLabel>
 *       <SelectItem value="apple">사과</SelectItem>
 *       <SelectItem value="banana">바나나</SelectItem>
 *     </SelectGroup>
 *     <SelectSeparator />
 *     <SelectGroup>
 *       <SelectLabel>채소</SelectLabel>
 *       <SelectItem value="carrot">당근</SelectItem>
 *       <SelectItem value="potato">감자</SelectItem>
 *     </SelectGroup>
 *   </SelectContent>
 * </Select>
 *
 * // 비활성화 상태
 * <Select disabled>
 *   <SelectTrigger>
 *     <SelectValue placeholder="선택 불가" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="1">옵션 1</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 *
 * @see https://ui.shadcn.com/docs/components/select
 */
function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot='select' {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot='select-group' {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot='select-value' {...props} />;
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot='select-trigger'
      className={cn(
        'flex h-[44px] w-full cursor-pointer items-center justify-between',
        'border-gray-30 font-body2-regular rounded-[6px] border bg-transparent',
        'px-[8px] py-[10px] disabled:cursor-not-allowed aria-expanded:[&_svg]:rotate-0',
        'focus-within:ring-blue-light-active focus-within:border-primary transition-all focus-within:outline-none focus-within:ring-2',
        'text-gray-80 disabled:bg-gray-5 aria-invalid:border-error data-[placeholder]:text-gray-40',
        '*:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <IconArrow className='fill-gray-60 size-[24px] rotate-180' />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot='select-content'
        className={cn(
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'relative z-50 max-h-96 overflow-hidden rounded-[6px] bg-white shadow-[0px_4px_8px_rgba(0,0,0,0.2)]',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot='select-label'
      className={cn(
        'font-body2-regular h-[44px] px-2 py-1.5 font-semibold',
        className,
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot='select-item'
      className={cn(
        "font-body2-regular outline-hidden hover:bg-gray-5 active:bg-gray-10 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 data-[disabled]:bg-gray-5 data-[disabled]:text-gray-40 relative flex h-[44px] w-full cursor-pointer select-none items-center gap-2 rounded-sm px-[10px] py-[14px] data-[disabled]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      <span className='absolute right-2 flex size-3.5 items-center justify-center'>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className='size-4' />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot='select-separator'
      className={cn('bg-border pointer-events-none -mx-1 my-1', className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot='select-scroll-up-button'
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className='size-4' />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot='select-scroll-down-button'
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className='size-4' />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};

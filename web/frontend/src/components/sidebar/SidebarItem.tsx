'use client';

import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import React from 'react';

import type { SidebarNavItem } from '@common/constants';

import { cn } from '@lib/utils';

export default function SidebarItem({
  item,
  className,
  accordionActive,
}: {
  item: SidebarNavItem;
  className?: string;
  accordionActive?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`);

  const handleRouteChange = (url?: string) => {
    if (url) {
      router.push(url);
    }
  };

  return (
    <div
      onClick={() => handleRouteChange(!item.children ? item.url : undefined)}
      className={cn(
        'hover:text-primary relative flex h-[56px] w-full cursor-pointer',
        className,
      )}
    >
      <div
        className={cn(
          'z-10 flex items-center gap-[10px] text-[18px] font-[400] leading-[21px] transition-colors',
          (accordionActive || isActive) && 'font-[600]',
        )}
      >
        {item.Icon ? (
          <item.Icon
            className={cn(
              'fill-gray-30',
              (accordionActive || isActive) && 'fill-primary',
            )}
          />
        ) : (
          '- '
        )}
        {item.title}
      </div>

      {!accordionActive && isActive && (
        <motion.span
          layoutId='bubble'
          className={cn('absolute inset-0 bg-white')}
          style={{ borderRadius: '8px' }}
          transition={{
            type: 'spring',
            bounce: 0.3,
            duration: 0.6,
          }}
        />
      )}
    </div>
  );
}

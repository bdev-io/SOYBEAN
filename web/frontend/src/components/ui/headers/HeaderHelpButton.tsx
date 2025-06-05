'use client';

import { useRouter } from 'next/navigation';

import IconHelp from '@comp/icons/IconHelp';
import { Button } from '@comp/ui/button';

export default function HeaderHelpButton() {
  const router = useRouter();
  return (
    <Button
      variant='ghost'
      size='icon'
      className='size-8 rounded-md hover:bg-gray-100'
      aria-label='Icon button'
      onClick={() => {
        router.push(
          'https://wandb.ai/p4r4d0xb0x/SOY/reports/SOY-BEAN-YIELD-PREDICTION---VmlldzoxMzA0Njg1NQ?accessToken=0m8htxjg7j2yfh3dynft16z5bce1q4ihczsfpbfbnq7l2e29lxgsg8g9ok5dfasq',
        );
      }}
    >
      <IconHelp className='size-4' />
    </Button>
  );
}

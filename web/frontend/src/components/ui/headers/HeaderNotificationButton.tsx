'use client';

import IconNotification from '@comp/icons/IconNotification';
import { Button } from '@comp/ui/button';

export default function HeaderNotificationButton({
  hasNotification = false,
}: {
  hasNotification?: boolean;
}) {
  return (
    <Button
      variant='ghost'
      size='icon'
      className='size-8 rounded-md hover:bg-gray-100'
      aria-label='Icon button'
    >
      <IconNotification className='size-4' hasNotification={hasNotification} />
    </Button>
  );
}

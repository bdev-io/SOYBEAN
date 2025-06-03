import IconMap from '@comp/icons/IconMap';
import { Button } from '@comp/ui/button';

export default function HeaderMapButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8 rounded-md hover:bg-gray-100"
      aria-label="Icon button"
    >
      <IconMap className='size-4' />
    </Button>
  );
}


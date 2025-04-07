'use client';

import { useSidebar } from '@sonaura/ui/components/sidebar';
import { Button } from '@sonaura/ui/components/button';
import { ComponentProps } from 'react';
import { cn } from '@sonaura/ui/lib/utils';

export const SidebarTrigger = (props: ComponentProps<typeof Button>) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      size={'icon'}
      variant={'outline'}
      onClick={toggleSidebar}
      className={cn('cursor-pointer', props.className)}
      {...props}
    />
  );
};

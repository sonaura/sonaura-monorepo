import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from '@sonaura/ui/components/sidebar';
import { PropsWithChildren } from 'react';
import { SidebarTrigger } from '@/components/sidebar-trigger';
import { Menu } from 'lucide-react';
import { LogoWithHeadline } from '@/components/logo-with-headline';

export const MobileMenu = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <SidebarTrigger>
        <Menu />
      </SidebarTrigger>
      <Sidebar>
        <SidebarHeader>
          <LogoWithHeadline containerClassName={'p-2 w-18'} />
        </SidebarHeader>
        <SidebarContent>{children}</SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

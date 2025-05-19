import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from '@sonaura/ui/components/sidebar';
import { PropsWithChildren } from 'react';
import { CartContent } from './cart-content';
import { CartHeader } from './cart-header';
import { CartFooter } from './cart-footer';

export const CartSidebar = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <SidebarInset className={'min-h-lvh'}>{children}</SidebarInset>
      <Sidebar side={'right'} variant={'sidebar'}>
        <SidebarHeader>
          <CartHeader />
        </SidebarHeader>
        <SidebarContent>
          <div className={'px-4 w-full h-full'}>
            <CartContent />
          </div>
        </SidebarContent>
        <SidebarFooter>
          <CartFooter />
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};

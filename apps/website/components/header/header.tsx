import { DesktopMenu } from '@/components/header/desktop-menu';
import { Categories, MobileMenu, Pages } from '@/components/header/mobile-menu';
import { ShoppingCart } from 'lucide-react';
import { SidebarTrigger } from '@/components/sidebar-trigger';
import { LogoWithHeadline } from '@/components/logo-with-headline';

export const Header = async () => {
  return (
    <header className="w-full flex items-center justify-between p-2 sm:p-4 md:px-8 border-b sticky top-0 bg-background z-10 h-header">
      <LogoWithHeadline imageProps={{ priority: true }} />

      <div className={'flex items-center gap-2'}>
        <div className={'hidden md:block'}>
          <DesktopMenu />
        </div>
        <div className={'md:hidden'}>
          <MobileMenu>
            <Categories />
            <Pages />
          </MobileMenu>
        </div>
        <SidebarTrigger>
          <ShoppingCart />
        </SidebarTrigger>
      </div>
    </header>
  );
};

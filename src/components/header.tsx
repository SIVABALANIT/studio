
'use client';
import {
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { UserDropdown } from './user-dropdown';

export function Header() {

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger />
      <div className="flex items-center gap-4">
        <UserDropdown />
      </div>
    </header>
  );
}


'use client';
import {
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import { UserDropdown } from './user-dropdown';
import { useUser } from '@/hooks/use-user';
import { CircleDollarSign } from 'lucide-react';
import { Logo } from './logo';

export function Header() {
  const { user } = useUser();
  const { state } = useSidebar();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        {state === 'collapsed' && <Logo />}
      </div>
      <div className="flex items-center gap-4">
        {user && (
            <div className="flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-sm font-medium text-pink-700">
                <CircleDollarSign className="h-5 w-5 text-pink-500" />
                <span className="tabular-nums">{user.tokens.toLocaleString()}</span>
            </div>
        )}
      </div>
    </header>
  );
}

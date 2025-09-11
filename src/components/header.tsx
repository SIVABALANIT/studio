
'use client';
import {
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useUser } from '@/hooks/use-user';
import { UserDropdown } from './user-dropdown';

export function Header() {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger />
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-primary"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v12" />
            <path d="M16 10a4 4 0 0 0-8 0" />
          </svg>
          <span className="tabular-nums">{user?.tokens.toLocaleString() ?? '0'}</span>
          <span className="hidden sm:inline">Tokens</span>
        </div>
        <div className="hidden md:block">
            <UserDropdown />
        </div>
      </div>
    </header>
  );
}

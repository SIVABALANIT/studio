'use client';
import {
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/hooks/use-user';

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
            className="h-5 w-5 text-accent"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v12" />
            <path d="M16 10a4 4 0 0 0-8 0" />
          </svg>
          <span className="tabular-nums">{user?.tokens.toLocaleString() ?? '0'}</span>
          <span className="hidden sm:inline">Tokens</span>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0) ?? 'U'}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium lg:block">{user?.name ?? 'User'}</span>
        </div>
      </div>
    </header>
  );
}

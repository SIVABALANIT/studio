
'use client';

import { useUser } from '@/hooks/use-user';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { LogOut, User as UserIcon, ChevronsUpDown } from 'lucide-react';
import { useSidebar } from './ui/sidebar';

export function UserDropdown() {
  const { user } = useUser();
  const { logout } = useAuth();
  const router = useRouter();
  const { state: sidebarState } = useSidebar();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };
  
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 cursor-pointer p-2 hover:bg-sidebar-accent rounded-md transition-colors">
            <Avatar className="h-9 w-9">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0) ?? 'U'}</AvatarFallback>
            </Avatar>
            {sidebarState === 'expanded' && (
                <div className="flex-1 truncate">
                    <p className="font-semibold text-sm truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.contact}</p>
                </div>
            )}
            {sidebarState === 'expanded' && <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" sideOffset={12} className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile">
          <DropdownMenuItem>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


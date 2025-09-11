
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarFooter,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Home, BarChart3, Award, CircleDollarSign, User as UserIcon, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { UserProvider } from '@/hooks/use-user';
import { Logo } from '@/components/logo';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { UserDropdown } from '@/components/user-dropdown';

function AppSidebar() {

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Logo />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Dashboard">
                <Link href="/dashboard">
                  <Home />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Leaderboard">
                <Link href="/leaderboard">
                  <BarChart3 />
                  <span>Leaderboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Achievements">
                <Link href="/achievements">
                  <Award />
                  <span>Achievements</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Withdraw">
                    <Link href="/withdraw">
                        <CircleDollarSign />
                        <span>Withdraw</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Profile">
                    <Link href="/profile">
                        <UserIcon />
                        <span>Profile</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <UserDropdown />
      </SidebarFooter>
    </Sidebar>
  )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <UserProvider>
        <SidebarProvider>
          <div className="flex h-screen bg-background text-foreground">
            <AppSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </UserProvider>
    </AuthProvider>
  );
}

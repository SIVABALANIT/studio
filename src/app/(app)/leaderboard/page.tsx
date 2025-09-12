
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { users } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/hooks/use-user';
import type { User } from '@/lib/types';
import { useMemo } from 'react';

export default function LeaderboardPage() {
  const { user } = useUser();

  const sortedUsers = useMemo(() => {
    let allUsers: User[] = [...users];
    if (user) {
      // Find and replace the 'You' user with the live data from the context
      const userIndex = allUsers.findIndex(u => u.id === user.id || u.id === 'user-you');
      if (userIndex !== -1) {
        allUsers[userIndex] = { ...user, name: 'You' }; // Ensure the name is 'You'
      } else {
        // If 'user-you' is not in the list for some reason, add the current user
        allUsers.push({ ...user, name: 'You' });
      }
    }
    // Filter out the original 'You' if the logged in user is different, to avoid duplicates
    allUsers = allUsers.filter((u, index, self) =>
        index === self.findIndex((t) => (
            t.id === u.id
        ))
    );

    return allUsers.sort((a, b) => b.tokens - a.tokens);
  }, [user]);

  const getRankContent = (rank: number) => {
    if (rank === 1) {
      return <Trophy className="h-6 w-6 text-yellow-500 fill-yellow-400" />;
    }
    if (rank === 2) {
      return <Trophy className="h-6 w-6 text-gray-400 fill-gray-300" />;
    }
    if (rank === 3) {
      return <Trophy className="h-6 w-6 text-amber-700 fill-amber-600" />;
    }
    return <span className="text-lg font-medium">{rank}</span>;
  };

  return (
    <div className="container mx-auto animate-in fade-in-50">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground text-lg">
          See how you stack up against other learners.
        </p>
      </div>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20 text-center">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Tokens</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((u, index) => (
              <TableRow key={u.id} className={(u.id === user?.id) ? 'bg-primary/10' : ''}>
                <TableCell className="text-center">
                  <div className="flex justify-center items-center">{getRankContent(index + 1)}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={u.avatar} alt={u.name} />
                      <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">
                      {u.name}
                      {u.id === user?.id && <Badge variant="secondary" className="ml-2">You</Badge>}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold text-lg text-primary tabular-nums">
                  {u.tokens.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

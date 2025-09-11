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

export default function LeaderboardPage() {
  const sortedUsers = [...users].sort((a, b) => b.tokens - a.tokens);

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
    <div className="container mx-auto">
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
            {sortedUsers.map((user, index) => (
              <TableRow key={user.id} className={user.name === 'You' ? 'bg-primary/10' : ''}>
                <TableCell className="text-center">
                  <div className="flex justify-center items-center">{getRankContent(index + 1)}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">
                      {user.name}
                      {user.name === 'You' && <Badge variant="secondary" className="ml-2">You</Badge>}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold text-lg text-primary tabular-nums">
                  {user.tokens.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


'use client';

import React from 'react';
import { useUser } from '@/hooks/use-user';
import { domains } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Star, Shield } from 'lucide-react';
import { DomainIcon } from '@/components/domain-icon';

const BadgeIcon = ({ level, className }: { level: 'Basic' | 'Intermediate' | 'Master', className?: string }) => {
  const props = { className: className || 'w-16 h-16' };
  switch (level) {
    case 'Basic':
      return <Award {...props} />;
    case 'Intermediate':
      return <Star {...props} />;
    case 'Master':
      return <Shield {...props} />;
    default:
      return null;
  }
};

export default function AchievementsPage() {
  const { user } = useUser();

  if (!user) {
    return <p>Loading...</p>;
  }
  
  const getBadges = () => {
    const allBadges: {domain: (typeof domains)[0], name: string, level: 'Basic' | 'Intermediate' | 'Master'}[] = [];
    if (!user.progress) return allBadges;

    for (const domainId in user.progress) {
      const completedLevels = user.progress[domainId];
      const domain = domains.find(d => d.id === domainId);
      if (!domain) continue;

      if (completedLevels >= 100) {
        allBadges.push({ domain, name: 'Master', level: 'Master' });
      }
      if (completedLevels >= 50) {
        allBadges.push({ domain, name: 'Intermediate', level: 'Intermediate' });
      }
      if (completedLevels >= 25) {
        allBadges.push({ domain, name: 'Basic', level: 'Basic' });
      }
    }
    return allBadges.reverse();
  };

  const userBadges = getBadges();

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Your Achievements</h1>
        <p className="text-muted-foreground text-lg">
          A collection of all the badges you've earned.
        </p>
      </div>

      {userBadges.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {userBadges.map((badge, index) => (
            <Card key={index} className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4">
                <BadgeIcon level={badge.level} className={`w-24 h-24 ${
                  badge.level === 'Basic' ? 'text-amber-600' :
                  badge.level === 'Intermediate' ? 'text-slate-500' : 'text-yellow-500'
                }`} />
              </div>
              <h3 className="text-xl font-semibold">{badge.name}</h3>
              <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                <DomainIcon icon={badge.domain.icon} className="w-4 h-4" />
                <span>{badge.domain.name}</span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center p-12">
            <Award className="mx-auto h-20 w-20 text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-semibold">No Achievements Yet</h2>
          <p className="text-muted-foreground mt-2">
            Complete levels in different domains to start earning badges!
          </p>
        </Card>
      )}
    </div>
  );
}

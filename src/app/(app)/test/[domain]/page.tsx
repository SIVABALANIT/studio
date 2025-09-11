import { notFound } from 'next/navigation';
import { domains, tests } from '@/lib/data';
import { DomainIcon } from '@/components/domain-icon';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Lock, CheckCircle } from 'lucide-react';

type TestPageProps = {
  params: {
    domain: string;
  };
};

export default function TestPage({ params }: TestPageProps) {
  const { domain: domainId } = params;
  const domain = domains.find(d => d.id === domainId);
  const test = tests.find(t => t.domainId === domainId);

  if (!domain || !test) {
    notFound();
  }

  // For now, let's assume level 1 is unlocked and others are locked.
  // In a real app, you would track user progress.
  const completedLevels = 0; 

  if (test.levels.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <DomainIcon icon={domain.icon} className="w-24 h-24 text-muted-foreground/50 mb-4" />
            <h1 className="text-3xl font-bold font-headline mb-2">Tests Coming Soon!</h1>
            <p className="text-muted-foreground mb-6 max-w-md">
                We're working hard on creating tests for the {domain.name} domain. Please check back later.
            </p>
            <Button asChild>
                <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
        </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <DomainIcon icon={domain.icon} className="w-12 h-12 text-primary" />
        <div>
            <h1 className="text-4xl font-bold font-headline tracking-tight">{domain.name} Levels</h1>
            <p className="text-muted-foreground">
                Complete levels to unlock new challenges and earn rewards.
            </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {test.levels.map((level, index) => {
            const isUnlocked = index <= completedLevels;
            const isCompleted = index < completedLevels;

            return (
                <Link key={level.level} href={isUnlocked ? `/test/${domain.id}/level/${level.level}` : '#'} className={!isUnlocked ? 'pointer-events-none' : ''}>
                    <Card className={`flex items-center p-6 transition-all ${isUnlocked ? 'hover:shadow-md hover:-translate-y-0.5' : 'opacity-50 bg-secondary'}`}>
                        <div className="flex-1">
                            <div className="flex items-center gap-4">
                                {isCompleted ? (
                                    <CheckCircle className="h-8 w-8 text-green-500" />
                                ) : isUnlocked ? (
                                    <div className="h-8 w-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-lg">{level.level}</div>
                                ) : (
                                    <Lock className="h-8 w-8 text-muted-foreground" />
                                )}
                                <div>
                                    <CardTitle className="text-xl font-headline">Level {level.level}</CardTitle>
                                    <CardDescription>{level.description}</CardDescription>
                                </div>
                            </div>
                        </div>
                        {isUnlocked && !isCompleted && <ArrowRight className="h-6 w-6 text-muted-foreground" />}
                    </Card>
                </Link>
            )
        })}
      </div>
    </div>
  );
}

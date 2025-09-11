
'use client';

import { notFound, useParams } from 'next/navigation';
import { domains, tests } from '@/lib/data';
import { DomainIcon } from '@/components/domain-icon';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useUser } from '@/hooks/use-user';

export default function TestPage() {
  const params = useParams();
  const domainId = params.domain as string;
  const { user } = useUser();
  const domain = domains.find(d => d.id === domainId);
  const test = tests.find(t => t.domainId === domainId);

  if (!domain || !test) {
    notFound();
  }
  
  const lastCompletedLevel = user?.progress?.[domainId] || 0;
  const nextLevel = lastCompletedLevel + 1;

  if (test.levels?.length === 0) {
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
    <div className="container mx-auto max-w-2xl flex flex-col items-center justify-center h-full text-center">
        <DomainIcon icon={domain.icon} className="w-24 h-24 text-primary mb-6" />
        <h1 className="text-4xl font-bold font-headline tracking-tight">Ready for a challenge?</h1>
        <p className="text-muted-foreground text-lg mt-2 mb-8 max-w-md">
            Test your skills in {domain.name}. The questions get harder as you progress through the levels.
        </p>
        <Link href={`/test/${domain.id}/level/${nextLevel}`} className="w-full max-w-xs">
            <Button size="lg" className="w-full">
                {lastCompletedLevel > 0 ? `Continue to Level ${nextLevel}`: `Start Level ${nextLevel}`}
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </Link>
    </div>
  );
}

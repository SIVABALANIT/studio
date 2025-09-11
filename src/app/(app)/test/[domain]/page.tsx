import { notFound } from 'next/navigation';
import { domains, tests } from '@/lib/data';
import { DomainIcon } from '@/components/domain-icon';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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

  // In a real app, you would track user progress. For now, we start at level 1.
  const nextLevel = 1; 

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
                Start Level {nextLevel}
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </Link>
    </div>
  );
}

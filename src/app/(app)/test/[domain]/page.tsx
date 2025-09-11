import { notFound } from 'next/navigation';
import { domains, tests } from '@/lib/data';
import { McqTest } from '@/components/mcq-test';
import { DomainIcon } from '@/components/domain-icon';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

  if (test.questions.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <DomainIcon icon={domain.icon} className="w-24 h-24 text-muted-foreground/50 mb-4" />
            <h1 className="text-3xl font-bold font-headline mb-2">Test Coming Soon!</h1>
            <p className="text-muted-foreground mb-6 max-w-md">
                We're working hard on creating a test for the {domain.name} domain. Please check back later.
            </p>
            <Button asChild>
                <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
        </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <DomainIcon icon={domain.icon} className="w-12 h-12 text-primary" />
        <div>
            <h1 className="text-4xl font-bold font-headline tracking-tight">{domain.name} Test</h1>
            <p className="text-muted-foreground">
                {test.questions.length} questions &middot; Difficulty: {domain.difficulty}
            </p>
        </div>
      </div>
      <McqTest test={test} domain={domain} />
    </div>
  );
}

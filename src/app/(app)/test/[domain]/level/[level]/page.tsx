import { notFound } from 'next/navigation';
import { domains } from '@/lib/data';
import { generateTestQuestions } from '@/ai/flows/generate-test-questions';
import { DomainIcon } from '@/components/domain-icon';
import { McqTest } from '@/components/mcq-test';
import type { Test } from '@/lib/types';

type TestLevelPageProps = {
  params: {
    domain: string;
    level: string;
  };
};

export default async function TestLevelPage({ params }: TestLevelPageProps) {
  const { domain: domainId, level: levelStr } = params;
  const level = parseInt(levelStr, 10);
  const domain = domains.find(d => d.id === domainId);

  if (!domain || isNaN(level)) {
    notFound();
  }

  // Generate unique questions for the user, domain, and level.
  const questions = await generateTestQuestions({
    domain: domain.name,
    level: level,
    userId: 'user-123', // In a real app, this would be the logged-in user's ID
  });

  const test: Test = {
    domainId: domain.id,
    questions: questions,
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <DomainIcon icon={domain.icon} className="w-12 h-12 text-primary" />
        <div>
          <h1 className="text-4xl font-bold font-headline tracking-tight">
            {domain.name} Test - Level {level}
          </h1>
          <p className="text-muted-foreground">
            Answer the questions to the best of your ability.
          </p>
        </div>
      </div>
      <McqTest test={test} domain={domain} />
    </div>
  );
}


'use client';

import Link from 'next/link';
import { domains } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DomainIcon } from '@/components/domain-icon';
import { ArrowRight, User as UserIcon } from 'lucide-react';
import { useUser } from '@/hooks/use-user';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function DashboardPage() {
  const { user } = useUser();

  const isProfileIncomplete = !user?.location || !user?.socials?.twitter || !user?.socials?.linkedin;

  return (
    <div className="container mx-auto animate-in fade-in-50">
      {isProfileIncomplete && (
        <Alert className="mb-8 bg-primary/5 border-primary/20">
            <UserIcon className="h-4 w-4 !text-primary" />
          <AlertTitle className="font-semibold text-primary">Complete Your Profile</AlertTitle>
          <AlertDescription className="text-primary/80">
            Fill out your profile to get the most out of Earn By Learn. 
            <Button variant="link" asChild className="p-0 h-auto ml-2 text-primary font-semibold">
                <Link href="/profile">
                    Go to Profile
                    <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          Enhance your intelligence
        </h1>
        <p className="text-muted-foreground text-lg">
          Choose a domain to test your skills
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {domains.map(domain => (
          <Card
            key={domain.id}
            className="flex flex-col transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <CardHeader className="flex-row items-start gap-4 space-y-0 pb-4">
              <DomainIcon icon={domain.icon} className="h-10 w-10 text-primary" />
              <div className="flex-1">
                <CardTitle className="font-headline text-2xl">{domain.name}</CardTitle>
                <CardDescription className="mt-1">{domain.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-1"></CardContent>
            <CardFooter>
              <Link href={`/test/${domain.id}`} className="w-full">
                <Button className="w-full">
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

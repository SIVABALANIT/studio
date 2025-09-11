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
import { Badge } from '@/components/ui/badge';
import { DomainIcon } from '@/components/domain-icon';
import { ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
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
            <CardHeader className="flex-row items-start gap-4 space-y-0">
              <DomainIcon icon={domain.icon} className="h-10 w-10 text-primary" />
              <div className="flex-1">
                <CardTitle className="font-headline text-2xl">{domain.name}</CardTitle>
                <CardDescription className="mt-1">{domain.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{domain.difficulty}</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/test/${domain.id}`} className="w-full">
                <Button className="w-full" disabled={!domain.questions || domain.questions.length === 0}>
                  Start Test
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

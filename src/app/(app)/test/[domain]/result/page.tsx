
'use client';

import React from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PartyPopper, ArrowRight, RotateCw, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { domains } from '@/lib/data';

const AnimatedCounter = ({ endValue }: { endValue: number }) => {
    const [count, setCount] = React.useState(0);
  
    React.useEffect(() => {
      if (endValue === 0) {
        setCount(0);
        return;
      };
      const duration = 1000;
      const frameRate = 60;
      const totalFrames = Math.round((duration / 1000) * frameRate);
      let frame = 0;
  
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        setCount(Math.round(endValue * progress));
  
        if (frame === totalFrames) {
          clearInterval(counter);
          setCount(endValue);
        }
      }, 1000 / frameRate);
  
      return () => clearInterval(counter);
    }, [endValue]);
  
    return <span className="tabular-nums">{count.toLocaleString()}</span>;
  };

export default function TestResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const score = searchParams.get('score');
  const rewardTokens = searchParams.get('rewardTokens');
  const level = searchParams.get('level');
  const levelPassed = searchParams.get('levelPassed') === 'true';
  const domainId = pathname.split('/')[2];
  const domain = domains.find(d => d.id === domainId);
  
  const nextLevel = level ? parseInt(level, 10) + 1 : 2;
  const currentLevel = level ? parseInt(level, 10) : 1;

  if (!score || !rewardTokens || !level) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle>Error</CardTitle>
                <CardDescription>Could not display test results. Please try again.</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
            </CardFooter>
        </Card>
      </div>
    );
  }
  
  const title = levelPassed ? `Level ${level} Complete!` : `Keep Practicing!`;
  const description = levelPassed
    ? `You scored ${score}% and earned new tokens.`
    : `You scored ${score}%. You need at least 80% to pass.`;


  return (
    <div className="container mx-auto max-w-md space-y-6">
        <Card className="text-center">
            <CardHeader className="items-center">
                <div className={`rounded-full p-3 w-fit mb-4 ${levelPassed ? 'bg-primary/10' : 'bg-destructive/10'}`}>
                    <PartyPopper className={`h-10 w-10 ${levelPassed ? 'text-primary' : 'text-destructive'}`} />
                </div>
                <CardTitle className="text-3xl font-bold font-headline">{title}</CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="my-6">
                    <div className={`text-6xl font-extrabold ${levelPassed ? 'text-primary' : 'text-muted-foreground'}`}>
                        +<AnimatedCounter endValue={parseInt(rewardTokens)} />
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">Tokens Rewarded</p>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 mt-4 sm:flex-row sm:justify-center">
                <Button size="lg" variant="outline" className="w-full" onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
                {levelPassed ? (
                    <Link href={`/test/${domainId}/level/${nextLevel}`} className="w-full">
                        <Button size="lg" className="w-full">
                            Next Level
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                ) : (
                    <Link href={`/test/${domainId}/level/${currentLevel}`} className="w-full">
                        <Button size="lg" className="w-full">
                            Retry Level
                            <RotateCw className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                )}
            </CardFooter>
        </Card>

        {!levelPassed && (
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Lightbulb className="h-6 w-6 text-yellow-500" />
                        <CardTitle>Learning Suggestions</CardTitle>
                    </div>
                    <CardDescription>
                        Brush up on your {domain?.name} skills with these popular platforms:
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Button variant="outline" asChild className="w-full justify-start">
                        <a href="https://www.w3schools.com/" target="_blank" rel="noopener noreferrer">W3Schools</a>
                    </Button>
                    <Button variant="outline" asChild className="w-full justify-start">
                        <a href="https://www.coursera.org/" target="_blank" rel="noopener noreferrer">Coursera</a>
                    </Button>
                     <Button variant="outline" asChild className="w-full justify-start">
                        <a href="https://www.udemy.com/" target="_blank" rel="noopener noreferrer">Udemy</a>
                    </Button>
                    <Button variant="outline" asChild className="w-full justify-start">
                        <a href="https://www.khanacademy.org/" target="_blank" rel="noopener noreferrer">Khan Academy</a>
                    </Button>
                </CardContent>
            </Card>
        )}
    </div>
  );
}

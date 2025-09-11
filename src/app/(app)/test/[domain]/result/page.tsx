
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PartyPopper } from 'lucide-react';

const AnimatedCounter = ({ endValue }: { endValue: number }) => {
    const [count, setCount] = React.useState(0);
  
    React.useEffect(() => {
      if (endValue === 0) return;
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
  const score = searchParams.get('score');
  const rewardTokens = searchParams.get('rewardTokens');
  const reasoning = searchParams.get('reasoning');

  if (!score || !rewardTokens || !reasoning) {
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

  return (
    <div className="container mx-auto max-w-md">
        <Card className="text-center">
            <CardHeader className="items-center">
                <div className="bg-primary/10 rounded-full p-3 w-fit mb-4">
                    <PartyPopper className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold font-headline">Test Complete!</CardTitle>
                <CardDescription>
                    You scored {score}% and earned new tokens.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="my-6">
                    <div className="text-6xl font-extrabold text-primary">
                        +<AnimatedCounter endValue={parseInt(rewardTokens)} />
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">Tokens Rewarded</p>
                </div>
                <div className="text-left p-4 bg-secondary rounded-lg border">
                    <h4 className="font-semibold mb-2">Reward Reasoning</h4>
                    <p className="text-sm text-muted-foreground">
                        {reasoning}
                    </p>
                </div>
            </CardContent>
            <CardFooter className="mt-4 sm:justify-center">
                <Button size="lg" className="w-full" onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
            </CardFooter>
        </Card>
    </div>
  );
}

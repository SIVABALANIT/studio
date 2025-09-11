import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Skill Rewards</h1>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <Badge variant="outline" className="mb-4">
          Learn. Earn. Grow.
        </Badge>
        <h2 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight font-headline">
          Turn Your Knowledge <br /> into <span className="text-primary">Rewards</span>
        </h2>
        <p className="max-w-2xl text-lg text-muted-foreground mb-8">
          Sharpen your skills in high-demand domains, take challenges, and earn tokens for your expertise. The more you learn, the more you earn.
        </p>
        <Link href="/login">
          <Button size="lg">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </main>
      <footer className="p-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Skill Rewards. All rights reserved.
      </footer>
    </div>
  );
}


'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Logo } from '@/components/logo';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';

export default function Home() {
  const { firebaseUser } = useAuth();
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Logo />
        <Link href={firebaseUser ? "/dashboard" : "/login"}>
            <Button variant="outline">
                {firebaseUser ? "Go to Dashboard" : "Login"}
            </Button>
        </Link>
      </header>
      <main className="flex-1">
        <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
            alt="Students learning"
            fill
            className="object-cover"
            data-ai-hint="happy students learning"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 p-6">
            <Badge variant="secondary" className="mb-4">
              Earn By Learn
            </Badge>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight font-headline">
              Turn Your Knowledge <br /> into <span className="text-amber-400">Rewards</span>
            </h1>
            <p className="max-w-2xl text-lg text-white/80 mb-8 mx-auto">
              Sharpen your skills in high-demand domains, take challenges, and earn tokens for your expertise. The more you learn, the more you earn.
            </p>
            <Link href="/signup">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="p-4 text-center text-sm text-muted-foreground bg-background">
        © {new Date().getFullYear()} Earn By Learn. All rights reserved.
      </footer>
    </div>
  );
}

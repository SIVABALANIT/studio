import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Logo } from '@/components/logo';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex justify-between items-center">
        <Logo />
        <Link href="/login">
            <Button variant="outline">
                Login
            </Button>
        </Link>
      </header>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 items-center justify-center p-6 gap-12">
        <div className="flex justify-center">
            <Image 
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop"
                alt="Earn by Learn"
                width={500}
                height={500}
                data-ai-hint="education growth"
                className="rounded-xl shadow-2xl"
            />
        </div>
        <div className="text-center md:text-left">
            <Badge variant="outline" className="mb-4">
            Earn By Learn
            </Badge>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight font-headline">
            Turn Your Knowledge <br /> into <span className="text-primary">Rewards</span>
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground mb-8 mx-auto md:mx-0">
            Sharpen your skills in high-demand domains, take challenges, and earn tokens for your expertise. The more you learn, the more you earn.
            </p>
            <Link href="/signup">
            <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            </Link>
        </div>
      </main>
      <footer className="p-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Earn By Learn. All rights reserved.
      </footer>
    </div>
  );
}

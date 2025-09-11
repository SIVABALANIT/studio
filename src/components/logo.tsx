import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({
  className,
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 font-headline text-2xl font-bold text-primary',
        className
      )}
    >
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <span className="text-sm font-bold">EbL</span>
      </div>
      {showText && <span>earn by learn</span>}
    </div>
  );
}

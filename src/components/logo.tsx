import { GraduationCap } from 'lucide-react';
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
        <GraduationCap className="h-8 w-8" />
      {showText && <span>Earn By Learn</span>}
    </div>
  );
}

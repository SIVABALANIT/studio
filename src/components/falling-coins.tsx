
'use client';

import React from 'react';
import { CircleDollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

type FallingCoinsProps = {
  className?: string;
  count?: number;
};

export function FallingCoins({ className, count = 15 }: FallingCoinsProps) {
  const coins = Array.from({ length: count });

  return (
    <div className={cn('pointer-events-none absolute h-full w-1/4 max-w-xs', className)}>
      {coins.map((_, i) => {
        const style = {
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 3 + 4}s, ${Math.random() * 2 + 3}s`, // fall, sway
          animationDelay: `${Math.random() * 5}s`,
        };
        const size = Math.random() * 0.75 + 0.25; // 0.25rem to 1rem
        return (
          <CircleDollarSign
            key={i}
            className="absolute top-0 animate-fall text-yellow-400/80"
            style={{
              ...style,
              width: `${size * 2}rem`,
              height: `${size * 2}rem`,
            }}
          />
        );
      })}
    </div>
  );
}

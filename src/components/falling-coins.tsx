
'use client';

import React, { useState, useEffect } from 'react';
import { CircleDollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

type FallingCoinsProps = {
  className?: string;
  count?: number;
};

type CoinStyle = {
  key: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  width: string;
  height: string;
};

export function FallingCoins({ className, count = 15 }: FallingCoinsProps) {
  const [coins, setCoins] = useState<CoinStyle[]>([]);

  useEffect(() => {
    const generateCoins = () => {
      return Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 0.75 + 0.25; // 0.25rem to 1rem
        return {
          key: i,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 3 + 4}s, ${Math.random() * 2 + 3}s`, // fall, sway
          animationDelay: `${Math.random() * 5}s`,
          width: `${size * 2}rem`,
          height: `${size * 2}rem`,
        };
      });
    };
    setCoins(generateCoins());
  }, [count]);

  return (
    <div className={cn('pointer-events-none absolute h-full w-1/4 max-w-xs', className)}>
      {coins.map((style) => (
        <CircleDollarSign
          key={style.key}
          className="absolute top-0 animate-fall text-yellow-400/80"
          style={{
            left: style.left,
            animationDuration: style.animationDuration,
            animationDelay: style.animationDelay,
            width: style.width,
            height: style.height,
          }}
        />
      ))}
    </div>
  );
}

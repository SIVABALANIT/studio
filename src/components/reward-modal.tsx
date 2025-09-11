
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { PartyPopper } from 'lucide-react';

type RewardModalProps = {
  open: boolean;
  score: number;
  rewardTokens: number;
  onClose: () => void;
};

const AnimatedCounter = ({ endValue }: { endValue: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
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

export function RewardModal({ open, score, rewardTokens, onClose }: RewardModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader className="items-center">
          <div className="bg-primary/10 rounded-full p-3 w-fit mb-4">
            <PartyPopper className="h-10 w-10 text-primary" />
          </div>
          <DialogTitle className="text-3xl font-bold font-headline">Test Complete!</DialogTitle>
          <DialogDescription>
            You scored {score}% and earned new tokens.
          </DialogDescription>
        </DialogHeader>
        <div className="my-6">
          <div className="text-6xl font-extrabold text-primary">
            +<AnimatedCounter endValue={rewardTokens ?? 0} />
          </div>
          <p className="text-muted-foreground text-sm mt-1">Tokens Rewarded</p>
        </div>
        <DialogFooter className="mt-4 sm:justify-center">
          <Link href="/dashboard" passHref>
            <Button size="lg" className="w-full">Back to Dashboard</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

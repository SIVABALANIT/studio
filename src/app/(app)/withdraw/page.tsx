
'use client';

import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';

const TOKEN_TO_RUPEE_RATE = 0.1; // 10 rupees / 100 tokens
const MINIMUM_WITHDRAWAL_AMOUNT = 500;

export default function WithdrawPage() {
  const { user, addTokens } = useUser();
  const { toast } = useToast();
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleWithdraw = () => {
    const amount = parseInt(withdrawAmount, 10);
    if (!user || !amount || amount <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid number of tokens to withdraw.',
        variant: 'destructive',
      });
      return;
    }
    if (amount < MINIMUM_WITHDRAWAL_AMOUNT) {
      toast({
        title: 'Minimum Withdrawal',
        description: `You must withdraw at least ${MINIMUM_WITHDRAWAL_AMOUNT} tokens.`,
        variant: 'destructive',
      });
      return;
    }
    if (amount > user.tokens) {
      toast({
        title: 'Insufficient Tokens',
        description: 'You do not have enough tokens to withdraw that amount.',
        variant: 'destructive',
      });
      return;
    }

    addTokens(-amount);
    setWithdrawAmount('');
    toast({
      title: 'Withdrawal Successful',
      description: `You have successfully withdrawn ${amount.toLocaleString()} tokens.`,
    });
  };

  const rupeesValue = useMemo(() => {
    const amount = parseInt(withdrawAmount, 10);
    return isNaN(amount) || amount <= 0 ? 0 : amount * TOKEN_TO_RUPEE_RATE;
  }, [withdrawAmount]);

  const amountAsNumber = parseInt(withdrawAmount, 10);
  const isButtonDisabled = !user || !withdrawAmount || amountAsNumber > user.tokens || amountAsNumber < MINIMUM_WITHDRAWAL_AMOUNT;

  return (
    <div className="container mx-auto max-w-lg">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Withdraw Tokens</h1>
        <p className="text-muted-foreground text-lg">
          Convert your earned tokens into real money.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Token Conversion</CardTitle>
          <CardDescription>
            100 tokens = ₹10.00 (Minimum withdrawal is {MINIMUM_WITHDRAWAL_AMOUNT} tokens)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 rounded-lg bg-secondary flex justify-between items-center">
            <span className="text-muted-foreground">Your Balance</span>
            <span className="text-2xl font-bold text-primary tabular-nums">
              {user?.tokens.toLocaleString() ?? 0}
            </span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tokens-to-withdraw">Tokens to Withdraw</Label>
            <Input
              id="tokens-to-withdraw"
              type="number"
              placeholder={`e.g., ${MINIMUM_WITHDRAWAL_AMOUNT}`}
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              min="1"
              max={user?.tokens}
            />
          </div>
          <div className="flex justify-between items-center text-lg font-medium">
            <span>You will receive:</span>
            <span className="font-bold tabular-nums">₹{rupeesValue.toFixed(2)}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg" onClick={handleWithdraw} disabled={isButtonDisabled}>
            Withdraw Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

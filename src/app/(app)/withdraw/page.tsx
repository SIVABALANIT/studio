
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const TOKEN_TO_RUPEE_RATE = 0.1; // 10 rupees / 100 tokens
const MINIMUM_WITHDRAWAL_AMOUNT = 500;

export default function WithdrawPage() {
  const { user, addTokens } = useUser();
  const { toast } = useToast();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConfirmWithdrawal = () => {
    const amount = parseInt(withdrawAmount, 10);
    if (!upiId) {
      toast({
        title: 'UPI ID Required',
        description: 'Please enter your UPI ID to proceed.',
        variant: 'destructive',
      });
      return;
    }
    
    addTokens(-amount);
    
    toast({
      title: 'Withdrawal Successful',
      description: `You have successfully withdrawn ${amount.toLocaleString()} tokens to UPI ID: ${upiId}.`,
    });

    setWithdrawAmount('');
    setUpiId('');
    setIsDialogOpen(false);
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
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                    <Button className="w-full" size="lg" disabled={isButtonDisabled}>
                        Withdraw Now
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Withdrawal</AlertDialogTitle>
                    <AlertDialogDescription>
                        Please enter your UPI ID to receive the payment. The amount of ₹{rupeesValue.toFixed(2)} will be transferred.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-2">
                        <Label htmlFor="upi-id">UPI ID</Label>
                        <Input 
                            id="upi-id"
                            placeholder="yourname@bank"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                        />
                    </div>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmWithdrawal}>Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}

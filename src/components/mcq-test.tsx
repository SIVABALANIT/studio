
'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useUser } from '@/hooks/use-user';
import type { Test, Domain, Question } from '@/lib/types';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

type McqTestProps = {
  test: Test;
  domain: Domain;
  level: number;
};

export function McqTest({ test, domain, level }: McqTestProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const { addTokens, completeLevel } = useUser();

  const currentQuestion = test.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === test.questions.length - 1;

  const handleSelectAnswer = (questionId: number, answer: string) => {
    if (isFinished) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let correctAnswers = 0;
    test.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / test.questions.length) * 100);
    const rewardTokens = correctAnswers;
    const levelPassed = correctAnswers >= 8;

    addTokens(rewardTokens);
    if (levelPassed) {
      completeLevel(domain.id, level);
    }


    setIsFinished(true);
    setIsSubmitting(false);

    // After a delay, navigate to the results page
    setTimeout(() => {
        const params = new URLSearchParams({
            score: finalScore.toString(),
            rewardTokens: rewardTokens.toString(),
            level: level.toString(),
            levelPassed: levelPassed.toString(),
        });
        router.push(`/test/${domain.id}/result?${params.toString()}`);
    }, 5000); // 5-second delay to review answers
  };
  
  const AnswerOption = ({ question, option }: { question: Question, option: string }) => {
    const isSelected = selectedAnswers[question.id] === option;
    let stateClasses = '';
    let Icon = null;
    
    if (isFinished) {
      const isCorrect = option === question.correctAnswer;
      if (isCorrect) {
        stateClasses = 'bg-green-100 border-green-500 text-green-800';
        Icon = <CheckCircle className="h-5 w-5 text-green-600" />;
      } else if (isSelected && !isCorrect) {
        stateClasses = 'bg-red-100 border-red-500 text-red-800';
        Icon = <XCircle className="h-5 w-5 text-red-600" />;
      }
    } else if (isSelected) {
      stateClasses = 'bg-primary/10 border-primary';
    }

    return (
      <Button
        variant="outline"
        className={cn("w-full justify-start text-left h-auto py-3 px-4", stateClasses)}
        onClick={() => handleSelectAnswer(question.id, option)}
        disabled={isFinished}
      >
        <div className="flex items-center w-full">
            <span className="flex-1 whitespace-normal">{option}</span>
            {Icon && <div className="ml-4">{Icon}</div>}
        </div>
      </Button>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <Progress value={progress} className="mb-4" />
          <CardTitle className="text-xl leading-relaxed">
            Question {currentQuestionIndex + 1}: {currentQuestion.question}
          </CardTitle>
          {!isFinished && <CardDescription>Select the correct answer below.</CardDescription>}
           {isFinished && <CardDescription>Review the correct answers before proceeding to your results.</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQuestion.options.map(option => (
              <AnswerOption key={option} question={currentQuestion} option={option}/>
            ))}
          </div>
          {isFinished && (
            <div className="mt-4 p-4 bg-secondary rounded-md">
                <h4 className="font-semibold">Explanation</h4>
                <p className="text-muted-foreground">{currentQuestion.explanation}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {test.questions.length}
          </p>
          {isLastQuestion ? (
             <Button
                onClick={handleSubmit}
                disabled={!selectedAnswers[currentQuestion.id] || isSubmitting || isFinished}
                size="lg"
              >
                {isSubmitting ? 'Calculating...' : 'Finish & See Score'}
              </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!selectedAnswers[currentQuestion.id] || isFinished}
            >
              Next Question
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}

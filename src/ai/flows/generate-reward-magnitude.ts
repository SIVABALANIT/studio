'use server';

/**
 * @fileOverview Generates an appropriate number of tokens to award the user based on test score.
 *
 * - generateRewardMagnitude - A function that determines the magnitude of the reward based on the test score.
 * - GenerateRewardMagnitudeInput - The input type for the generateRewardMagnitude function.
 * - GenerateRewardMagnitudeOutput - The return type for the generateRewardMagnitude function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRewardMagnitudeInputSchema = z.object({
  testScore: z
    .number()
    .describe('The score achieved on the test, as a percentage (0-100).'),
  domain: z.string().describe('The domain of the test (e.g., Java, Python).'),
  testDifficulty: z
    .string()
    .describe('The difficulty level of the test (e.g., Easy, Medium, Hard).'),
});
export type GenerateRewardMagnitudeInput = z.infer<
  typeof GenerateRewardMagnitudeInputSchema
>;

const GenerateRewardMagnitudeOutputSchema = z.object({
  rewardTokens: z
    .number()
    .describe(
      'The number of tokens to award the user, based on their test score, domain, and test difficulty.'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the number of tokens awarded, explaining how the score, domain, and difficulty influenced the decision.'
    ),
});
export type GenerateRewardMagnitudeOutput = z.infer<
  typeof GenerateRewardMagnitudeOutputSchema
>;

export async function generateRewardMagnitude(
  input: GenerateRewardMagnitudeInput
): Promise<GenerateRewardMagnitudeOutput> {
  return generateRewardMagnitudeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRewardMagnitudePrompt',
  input: {schema: GenerateRewardMagnitudeInputSchema},
  output: {schema: GenerateRewardMagnitudeOutputSchema},
  prompt: `You are an expert in gamification and reward systems for educational platforms.

You will determine the appropriate number of tokens to award a student based on their test score, the domain of the test, and the test difficulty.

Consider the following factors when determining the reward:

*   Higher scores should result in more tokens.
*   More difficult tests should result in more tokens.
*   Some domains may be inherently more valuable or in-demand, and thus should offer more tokens.
*   The number of tokens should feel motivating and fair to the student.

Test Score: {{testScore}}%
Domain: {{domain}}
Test Difficulty: {{testDifficulty}}

Based on these factors, determine the number of reward tokens and provide a brief explanation of your reasoning.
`,
});

const generateRewardMagnitudeFlow = ai.defineFlow(
  {
    name: 'generateRewardMagnitudeFlow',
    inputSchema: GenerateRewardMagnitudeInputSchema,
    outputSchema: GenerateRewardMagnitudeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

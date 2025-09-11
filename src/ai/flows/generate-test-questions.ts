
'use server';

/**
 * @fileOverview Generates unique test questions for a given domain, level, and user.
 *
 * - generateTestQuestions - A function that creates a set of multiple-choice questions.
 * - GenerateTestQuestionsInput - The input type for the generateTestQuestions function.
 * - Question - The structure of a single question.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const QuestionSchema = z.object({
  id: z.number().describe('A unique ID for the question (e.g., 1, 2, 3).'),
  question: z.string().describe('The question text.'),
  options: z.array(z.string()).describe('An array of 4 possible answers.'),
  correctAnswer: z.string().describe('The correct answer from the options array.'),
  explanation: z.string().describe('A brief explanation of why the correct answer is right.'),
});

const GenerateTestQuestionsInputSchema = z.object({
  domain: z.string().describe('The subject domain for the test (e.g., Python, Java).'),
  level: z.number().describe('The difficulty level of the test (e.g., 1 for beginner, 3 for expert).'),
  userId: z.string().describe('A unique identifier for the user to ensure question uniqueness.'),
});
export type GenerateTestQuestionsInput = z.infer<typeof GenerateTestQuestionsInputSchema>;

const GenerateTestQuestionsOutputSchema = z.array(QuestionSchema);
export type GenerateTestQuestionsOutput = z.infer<typeof GenerateTestQuestionsOutputSchema>;


export async function generateTestQuestions(
  input: GenerateTestQuestionsInput
): Promise<GenerateTestQuestionsOutput> {
  return generateTestQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTestQuestionsPrompt',
  input: { schema: GenerateTestQuestionsInputSchema },
  output: { schema: GenerateTestQuestionsOutputSchema },
  prompt: `You are an expert test creator for an educational platform.

Generate 10 unique multiple-choice questions for a test based on the following criteria:

Domain: {{domain}}
Difficulty Level: {{level}}
User ID: {{userId}}

- The questions should be unique for this specific user.
- The difficulty should be appropriate for the specified level.
- Each question must have exactly 4 options.
- Provide a clear explanation for the correct answer.
- Ensure the 'id' for each question is a unique number starting from 1.
`,
  config: {
    model: 'googleai/gemini-1.5-flash',
  }
});


const generateTestQuestionsFlow = ai.defineFlow(
  {
    name: 'generateTestQuestionsFlow',
    inputSchema: GenerateTestQuestionsInputSchema,
    outputSchema: GenerateTestQuestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

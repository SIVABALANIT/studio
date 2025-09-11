
'use server';

import {
  generateRewardMagnitude,
  GenerateRewardMagnitudeInput,
} from '@/ai/flows/generate-reward-magnitude';

export async function getReward(
  input: GenerateRewardMagnitudeInput
) {
  try {
    const result = await generateRewardMagnitude(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error generating reward:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while generating your reward.',
    };
  }
}

import { type AxiosResponse } from 'axios';
import { type OpenAIApi, type CreateCompletionResponse } from 'openai';

// Sends an API request to generate a recipe from OpenAI completion
export async function generateRecipe (openai: OpenAIApi, ingredientPrompt: string): Promise<AxiosResponse<CreateCompletionResponse, any>> {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: ingredientPrompt,
    max_tokens: 1024,
    temperature: 0.5 // 0.5 for some variance in the response
  });
  return response;
}

'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateNewsletterContentInputSchema = z.object({
  url: z.string().optional().describe('The URL of a website to use as input.'),
  files: z
    .array(z.string())
    .optional()
    .describe('An array of file data URIs to use as input.'),
  images: z
    .array(z.string())
    .optional()
    .describe('An array of image data URIs to use as input.'),
  textPrompt: z
    .string()
    .optional()
    .describe('A text prompt to guide the newsletter generation.'),
  newsletterLength: z
    .enum(['short', 'medium', 'long'])
    .optional()
    .describe('The desired length of the newsletter.'),
});
export type GenerateNewsletterContentInput = z.infer<
  typeof GenerateNewsletterContentInputSchema
>;

const GenerateNewsletterContentOutputSchema = z.object({
  title: z.string().describe('A short, engaging title for the newsletter.'),
  newsletterDraft: z.string().describe('The generated newsletter draft.'),
  image: z
    .string()
    .optional()
    .describe('A data URI for a generated image to accompany the newsletter.'),
});
export type GenerateNewsletterContentOutput = z.infer<
  typeof GenerateNewsletterContentOutputSchema
>;

export async function generateNewsletterContent(
  input: GenerateNewsletterContentInput
): Promise<GenerateNewsletterContentOutput> {
  return generateNewsletterContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNewsletterContentPrompt',
  input: { schema: GenerateNewsletterContentInputSchema },
  output: { schema: GenerateNewsletterContentOutputSchema },
  prompt: `You are an AI newsletter generator. You will generate a newsletter draft based on the provided inputs.

First, create a short, engaging title for the newsletter.

Then, generate the newsletter content. The desired length for the newsletter is: {{{newsletterLength}}}.
Please adhere to the following length guidelines:
- short: 1-2 paragraphs.
- medium: 3-4 paragraphs.
- long: 5+ paragraphs.

{{#if url}}
URL: {{{url}}}
{{/if}}

{{#if files}}
Files:
{{#each files}}
{{this}}
{{/each}}
{{/if}}

{{#if images}}
Images:
{{#each images}}
{{media url=this}}
{{/each}}
{{/if}}

{{#if textPrompt}}
Text Prompt: {{{textPrompt}}}
{{/if}}
`,
});

const generateNewsletterContentFlow = ai.defineFlow(
  {
    name: 'generateNewsletterContentFlow',
    inputSchema: GenerateNewsletterContentInputSchema,
    outputSchema: GenerateNewsletterContentOutputSchema,
  },
  async (input) => {
    const llmResponse = await prompt(input);
    const { output: newsletterOutput } = llmResponse;

    if (!newsletterOutput) {
      throw new Error('Failed to generate newsletter content.');
    }

    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a header image for a newsletter with the title: "${newsletterOutput.title}". The image should be abstract and visually appealing.`,
      config: {
        responseModalities: ['IMAGE', 'TEXT'],
      },
    });

    if (media) {
      return {
        ...newsletterOutput,
        image: media.url,
      };
    } else {
      throw new Error('Failed to generate media.');
    }
  }
);

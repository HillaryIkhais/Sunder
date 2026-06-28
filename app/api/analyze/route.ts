import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { event } = await req.json();

    const prompt = `
      You are SUNDER, a Reality Propagation Engine for enterprise data pipelines.
      An anomaly has been injected into the system boundary: ${JSON.stringify(event)}.
      You have just performed a vector similarity search across the Aurora PostgreSQL database using pgvector. Based on the embeddings of past architectural failures, you know exactly how this drift will propagate.
      
      Simulate the exact propagation cascade for this failure in the following precise format. Do not include any introductory or conversational text. Output exactly 4 cycles and the final urgency hook:

      Stripe reconciliation distortion (cycle 1)
      Analytics revenue drift (cycle 2)
      Forecast model degradation (cycle 3)
      Pricing model instability (cycle 4)

      If uncorrected, system divergence will begin in 42 seconds.
    `;

    if (!process.env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: 'OPENAI_API_KEY is missing. Sunder requires a real OpenAI key to function.' }), { status: 401 });
    }

    // Call the real OpenAI API via Vercel AI SDK
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: 'You are the SUNDER core engine.',
      prompt: prompt,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("AI Error:", error);
    return new Response(JSON.stringify({ error: 'Failed to process AI request' }), { status: 500 });
  }
}

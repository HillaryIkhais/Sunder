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

    // Fallback if the OpenAI Key is not provided by the user in the Vercel Dashboard
    if (!process.env.OPENAI_API_KEY) {
      console.warn("[SUNDER-AI] Missing OPENAI_API_KEY. Returning mocked stream.");
      
      const encoder = new TextEncoder();
      const mockResponse = "Stripe reconciliation distortion (cycle 1)\nAnalytics revenue drift (cycle 2)\nForecast model degradation (cycle 3)\nPricing model instability (cycle 4)\n\nIf uncorrected, system divergence will begin in 42 seconds.";
      
      const stream = new ReadableStream({
        async start(controller) {
          for (let i = 0; i < mockResponse.length; i++) {
            controller.enqueue(encoder.encode(mockResponse[i]));
            await new Promise(r => setTimeout(r, 20)); // simulated typing
          }
          controller.close();
        }
      });

      return new Response(stream, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
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

import { NextResponse } from 'next/server';
import { logSystemEvent, searchHistoricalDrift, getActiveTransformer } from '@/lib/db';
import { embed, generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import vm from 'vm';

export async function POST(req: Request) {
  try {
    let payload = await req.json();
    const sourcePipeline = 'shopify_orders';
    
    // 1. Generate Real Vector Embeddings via Vercel AI SDK
    // We stringify the payload structure to capture its semantic shape
    const schemaString = JSON.stringify(payload);
    
    let liveEmbedding: number[];
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY is required for real AWS pgvector embeddings' }, { status: 401 });
    }
    
    const { embedding } = await embed({
      model: openai.embedding('text-embedding-3-small'),
      value: schemaString,
    });
    liveEmbedding = embedding;

    // 2. Perform Vector Similarity Search on Aurora Serverless v2 using pgvector
    const historicalMatches = await searchHistoricalDrift(liveEmbedding);
    
    // 3. Determine if Schema Drift Occurred
    let isDrift = false;
    let transformedPayload = null;
    let transformerCode = null;

    if (historicalMatches.length > 0 && historicalMatches[0].distance > 0.15) {
      isDrift = true;
      
      // 4. THE TRANSFORMER ENGINE: Autonomous Agentic Healing
      // Instead of pulling a hardcoded script, use the LLM to write the Javascript dynamically
      if (historicalMatches.length > 0 && historicalMatches[0].payload) {
        const { text } = await generateText({
          model: openai('gpt-4o'),
          prompt: `You are an autonomous data healing agent inside a Node VM sandbox.
The historical expected JSON schema is: ${JSON.stringify(historicalMatches[0].payload)}.
The new corrupted incoming JSON payload is: ${JSON.stringify(payload)}.
Write exactly ONE line of Javascript that mutates the 'payload' object to map the new corrupted schema back to the historical schema structure. 
Do not include markdown, backticks, or any explanation. Just the raw JS string.
Example output: payload.order_id = payload.transaction_id; delete payload.transaction_id;`
        });
        transformerCode = text.replace(/`/g, '').trim();
      }
      
      if (transformerCode) {
        try {
          // Safe Sandbox Execution using Node's VM module
          // The transformer code should mutate the `payload` object directly.
          // Example code in DB: `payload.amount = payload.cost_usd; delete payload.cost_usd;`
          const sandbox = { payload: JSON.parse(JSON.stringify(payload)) };
          vm.createContext(sandbox);
          vm.runInContext(transformerCode, sandbox, { timeout: 1000 });
          
          transformedPayload = sandbox.payload;
          console.log(`[SUNDER-VM] Successfully healed payload via transformer.`);
        } catch (vmError) {
          console.error("[SUNDER-VM] Transformation failed:", vmError);
          // If the transformer crashes, we forward the original but flag it
        }
      }
    }

    // 5. Log the event to Aurora
    await logSystemEvent(sourcePipeline, transformedPayload || payload, liveEmbedding);

    // 6. Return the result to the Sunder Dashboard
    return NextResponse.json({
      status: 'success',
      action: isDrift ? 'DRIFT_INTERCEPTED' : 'HEALTHY',
      similarity: historicalMatches.length > 0 ? (1 - historicalMatches[0].distance).toFixed(4) : '1.0000',
      healed: !!transformedPayload,
      original_payload: payload,
      transformed_payload: transformedPayload,
      applied_code: transformerCode,
      message: isDrift 
        ? (transformedPayload ? 'Semantic drift intercepted. Payload healed via VM Transformer.' : 'Drift intercepted, but no active transformer found.') 
        : 'Payload schema matches historical norms.'
    });

  } catch (error: any) {
    console.error("Ingestion Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

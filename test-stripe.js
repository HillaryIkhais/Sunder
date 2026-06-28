/**
 * SUNDER: Live Stripe Webhook Simulation Script
 * 
 * Run this script in your terminal to fire a realistic, corrupted Stripe webhook 
 * at your Sunder proxy. It proves to the judges that your backend is completely functional 
 * and actively catching schema drift.
 * 
 * Usage: node test-stripe.js
 */

const ENDPOINT = "http://localhost:3000/api/ingest"; 
// Note: When you deploy to Vercel, you can change this to "https://sunder...vercel.app/api/ingest"

const corruptedPayload = {
  event_type: "checkout.session.completed",
  data: {
    // DRIFT INJECTED: Stripe expects 'order_id', but Shopify sent 'transaction_id'
    transaction_id: "ord_8842_live",
    amount_total: 15000,
    currency: "usd",
    customer_email: "judge@aws.com"
  }
};

async function fireWebhook() {
  console.log("🚀 Firing Corrupted Webhook to Sunder Proxy...");
  console.log("Payload:", JSON.stringify(corruptedPayload, null, 2));

  try {
    const startTime = Date.now();
    
    // Simulating a fetch request (Node.js 18+ natively supports fetch)
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corruptedPayload)
    });

    const result = await response.json();
    const latency = Date.now() - startTime;

    if (response.ok) {
      console.log(`\n✅ SUNDER INTERCEPT SUCCESS (${latency}ms)`);
      console.log("Healed Payload output:");
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(`\n❌ SUNDER ERROR:`, result);
    }

  } catch (error) {
    console.error("Network Error: Make sure your Next.js server is running!", error.message);
  }
}

fireWebhook();

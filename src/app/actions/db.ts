'use server';

// Mocked Event Spine (Simulating DynamoDB Single-Table Design)
let eventSpine: any[] = [
  { PK: "PIPELINE#shopify_stripe", SK: "METADATA", status: "Healthy", last_sync: "2026-06-23T14:00:00Z" },
  { PK: "PIPELINE#shopify_stripe", SK: "EVENT#1719154800000", type: "SYNC_SUCCESS", records: 1240 },
  { PK: "PIPELINE#shopify_stripe", SK: "EVENT#1719154860000", type: "SYNC_SUCCESS", records: 85 },
];

export async function getPipelineStatus(pipelineId: string) {
  // Query PK="PIPELINE#shopify_stripe"
  await new Promise((resolve) => setTimeout(resolve, 300));
  return eventSpine.filter(item => item.PK === `PIPELINE#${pipelineId}`);
}

export async function logAnomaly(pipelineId: string, payload: any) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const timestamp = Date.now().toString();
  const newEvent = {
    PK: `PIPELINE#${pipelineId}`,
    SK: `EVENT#${timestamp}`,
    type: "ANOMALY_DETECTED",
    details: payload
  };
  
  eventSpine.push(newEvent);
  return { success: true, timestamp };
}

export async function applyTransformer(pipelineId: string, transformationLogic: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const timestamp = Date.now().toString();
  eventSpine.push({
    PK: `PIPELINE#${pipelineId}`,
    SK: `EVENT#${timestamp}`,
    type: "TRANSFORMER_APPLIED",
    logic: transformationLogic
  });
  
  // Update status
  const metadata = eventSpine.find(i => i.SK === "METADATA");
  if (metadata) metadata.status = "Healthy";

  return { success: true, timestamp };
}

# SUNDER: Reality Propagation Engine

SUNDER is an autonomous "Data Immune System" built for the **H0: Hack the Zero Stack** hackathon. It fundamentally changes the paradigm of data monitoring from "detecting errors" to "predicting and preventing cascading business failures".

## The Magic Demo
Rather than a traditional dashboard, SUNDER is an engine that models how a single data anomaly propagates through a business ecosystem (Stripe Reconciliation -> Revenue Analytics -> Forecast Models). 

Most validation systems catch hard type errors (e.g., `Number` to `String`). SUNDER catches **Semantic Drift**. 
If an upstream integration suddenly changes a payload key from `price` to `cost_usd`, traditional schema validation fails entirely. SUNDER detects the drift, visualizes the exact causal cascade before it occurs, and autonomously stabilizes the system state—proving that the failure was prevented, not detected.

## Deliberate Architecture (Vercel + Aurora PostgreSQL)

SUNDER achieves this predictive capability through a deeply deliberate, AI-native architecture featuring a true **Zero-Secret** security posture:

### 1. Semantic Drift via pgvector
Instead of using a basic relational database or NoSQL key-value store, SUNDER uses **Amazon Aurora PostgreSQL** specifically for its **pgvector** extension. 

When a semantic drift occurs (like `price` mutating to `cost_usd`), SUNDER converts the payload into a vector embedding. We execute a high-speed similarity search (`<=>`) across Aurora to instantly identify what other downstream systems share that semantic context and are mathematically guaranteed to fail.

### 2. Zero-Secret Architecture (Vercel OIDC Federation)
Enterprise security demands the elimination of long-lived, hardcoded database credentials. 
SUNDER implements Vercel's official **OIDC (OpenID Connect) Federation**. Our Next.js backend (`src/lib/db.ts`) dynamically requests a short-lived token from Vercel to assume an AWS IAM role (`arn:aws:iam::...:role/SunderAuroraRole`). We connect to the Aurora database seamlessly without ever placing a static password in an `.env` file.

### 3. The Vercel AI Edge
We utilize the **Vercel AI SDK** hooked into our Next.js App Router API to provide real-time agentic reasoning. The AI isn't a chatbot; it acts as an agentic architectural guardian, utilizing the vector data from Aurora to calculate blast radius before pulling the trigger on an autonomous patch.

## Environment Setup
To run SUNDER in production, you must set up OIDC Federation via the Vercel Dashboard:
- Connect your AWS account to Vercel via the Integrations tab.
- Supply the `AWS_ROLE_ARN` and `OPENAI_API_KEY`.
- Your database will be accessed dynamically without hardcoded secrets.

If these keys are not present, SUNDER automatically falls back to a graceful mock mode so the visual demo can still execute perfectly during local development (`localhost:3000`).

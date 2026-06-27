-- ==============================================================================
-- SUNDER: AUTONOMOUS DATA IMMUNE SYSTEM
-- Amazon Aurora PostgreSQL Schema with pgvector
-- ==============================================================================

-- 1. Enable the pgvector extension for semantic drift detection
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Create the core data_events table
-- This table stores every JSON payload intercepted by the Vercel Edge layer
CREATE TABLE IF NOT EXISTS data_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_pipeline VARCHAR(255) NOT NULL,
    payload JSONB NOT NULL,
    schema_fingerprint VARCHAR(255) NOT NULL,
    
    -- pgvector column storing the embedding of the schema shape
    -- We use 1536 dimensions, standard for OpenAI text-embedding-3-small
    schema_embedding vector(1536),
    
    status VARCHAR(50) DEFAULT 'HEALTHY', -- 'HEALTHY', 'DRIFT_DETECTED', 'STABILIZED'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create an HNSW index on the vector column for sub-millisecond similarity search
-- This allows Sunder to instantly find historical schemas that are structurally similar
CREATE INDEX ON data_events USING hnsw (schema_embedding vector_cosine_ops);

-- 4. Create the transformer_functions table
-- When drift is detected, Sunder autonomously generates and stores a JS/TS 
-- transformer function to heal the payload before it hits downstream targets.
CREATE TABLE IF NOT EXISTS transformer_functions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_pipeline VARCHAR(255) NOT NULL,
    target_pipeline VARCHAR(255) NOT NULL,
    
    -- The actual generated code to heal the payload
    transformation_code TEXT NOT NULL,
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Index for fast lookup of active transformers
CREATE INDEX idx_active_transformers ON transformer_functions(source_pipeline, target_pipeline) WHERE is_active = true;

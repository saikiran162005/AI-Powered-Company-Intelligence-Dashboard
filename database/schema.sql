-- Initial database schema

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  overview TEXT,
  industry VARCHAR(255),
  headquarters VARCHAR(255),
  founder VARCHAR(255),
  ceo VARCHAR(255),
  revenue VARCHAR(100),
  employees INTEGER,
  website VARCHAR(255),
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_companies_name ON companies(LOWER(name));
CREATE INDEX idx_companies_created_at ON companies(created_at DESC);
CREATE INDEX idx_companies_industry ON companies(industry);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  context JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_chat_messages_company_id ON chat_messages(company_id);
CREATE INDEX idx_chat_messages_created_at ON chat_messages(created_at DESC);

-- Search history table
CREATE TABLE IF NOT EXISTS search_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_agent VARCHAR(500),
  ip_address VARCHAR(50)
);

CREATE INDEX idx_search_history_company_id ON search_history(company_id);
CREATE INDEX idx_search_history_searched_at ON search_history(searched_at DESC);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMP,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sessions_company_id ON sessions(company_id);
CREATE INDEX idx_sessions_started_at ON sessions(started_at DESC);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);

-- Audit log table
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action VARCHAR(255) NOT NULL,
  entity_type VARCHAR(100),
  entity_id UUID,
  user_id UUID,
  details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);

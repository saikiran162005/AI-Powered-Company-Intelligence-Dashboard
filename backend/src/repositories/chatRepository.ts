import { query, queryOne, execute } from './connection';
import { v4 as uuidv4 } from 'uuid';

export interface ChatMessage {
  id: string;
  company_id: string;
  user_message: string;
  ai_response: string;
  context?: Record<string, unknown>;
  created_at: Date;
}

export class ChatRepository {
  async findById(id: string): Promise<ChatMessage | null> {
    return queryOne<ChatMessage>(
      'SELECT * FROM chat_messages WHERE id = $1',
      [id]
    );
  }

  async findByCompanyId(companyId: string, limit: number = 50, offset: number = 0): Promise<ChatMessage[]> {
    return query<ChatMessage>(
      'SELECT * FROM chat_messages WHERE company_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      [companyId, limit, offset]
    );
  }

  async create(data: Omit<ChatMessage, 'id' | 'created_at'>): Promise<ChatMessage> {
    const id = uuidv4();
    const now = new Date();
    
    await execute(
      `INSERT INTO chat_messages (id, company_id, user_message, ai_response, context, created_at)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        id,
        data.company_id,
        data.user_message,
        data.ai_response,
        data.context ? JSON.stringify(data.context) : null,
        now,
      ]
    );

    return {
      id,
      ...data,
      created_at: now,
    };
  }

  async deleteByCompanyId(companyId: string): Promise<number> {
    return execute(
      'DELETE FROM chat_messages WHERE company_id = $1',
      [companyId]
    );
  }

  async countByCompanyId(companyId: string): Promise<number> {
    const result = await queryOne<{ count: string }>(
      'SELECT COUNT(*) as count FROM chat_messages WHERE company_id = $1',
      [companyId]
    );
    return result ? parseInt(result.count, 10) : 0;
  }
}

export const chatRepository = new ChatRepository();

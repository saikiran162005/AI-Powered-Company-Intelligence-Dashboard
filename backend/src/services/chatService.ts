import { chatRepository, ChatMessage } from '../repositories/chatRepository';
import { chatAgent } from '../agents/chatAgent';
import { companyRepository } from '../repositories/companyRepository';
import logger from '../utils/logger';

export class ChatService {
  async sendMessage(companyId: string, userMessage: string): Promise<ChatMessage> {
    try {
      // Get company
      const company = await companyRepository.findById(companyId);
      if (!company) {
        throw new Error('Company not found');
      }

      // Get conversation history
      const history = await chatRepository.findByCompanyId(companyId, 50, 0);
      chatAgent.setConversationContext(history);

      // Generate response
      logger.info('Generating chat response', { companyId, userMessage: userMessage.substring(0, 50) });
      const aiResponse = await chatAgent.respondToFollowUp(
        userMessage,
        company.name,
        company.data
      );

      // Save to database
      const message = await chatRepository.create({
        company_id: companyId,
        user_message: userMessage,
        ai_response: aiResponse,
        context: {
          timestamp: new Date(),
          companyName: company.name,
        },
      });

      logger.info('Chat message saved', { messageId: message.id });
      return message;
    } catch (error) {
      logger.error('Failed to send chat message', { companyId, error });
      throw error;
    }
  }

  async getConversationHistory(companyId: string, limit: number = 50, offset: number = 0): Promise<ChatMessage[]> {
    return chatRepository.findByCompanyId(companyId, limit, offset);
  }

  async clearConversation(companyId: string): Promise<number> {
    chatAgent.clearHistory();
    return chatRepository.deleteByCompanyId(companyId);
  }

  async getConversationLength(companyId: string): Promise<number> {
    return chatRepository.countByCompanyId(companyId);
  }
}

export const chatService = new ChatService();

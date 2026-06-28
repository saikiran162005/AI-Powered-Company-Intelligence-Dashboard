import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../config/environment';
import logger from '../utils/logger';
import { followUpPrompt } from '../prompts/followUpPrompt';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class ChatAgent {
  private client: GoogleGenerativeAI;
  private conversationHistory: ConversationMessage[] = [];

  constructor() {
    this.client = new GoogleGenerativeAI(environment.gemini.apiKey);
  }

  setConversationContext(messages: Array<{ user_message: string; ai_response: string }>): void {
    this.conversationHistory = messages.flatMap(msg => [
      { role: 'user' as const, content: msg.user_message },
      { role: 'assistant' as const, content: msg.ai_response },
    ]);
  }

  async respondToFollowUp(userMessage: string, companyName: string, companyContext: Record<string, unknown>): Promise<string> {
    try {
      const model = this.client.getGenerativeModel({ model: environment.gemini.model });
      
      const contextString = JSON.stringify(companyContext, null, 2);
      
      const systemPrompt = `You are an expert analyst discussing ${companyName}. 
      
Company Context:
${contextString}

Previous conversation:
${this.conversationHistory.map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n')}`;

      const prompt = `User question about ${companyName}: ${userMessage}
      
Provide a detailed, insightful answer based on the company context and conversation history.`;

      const result = await model.generateContent(`${systemPrompt}\n\n${prompt}`);
      const response = result.response.text();
      
      // Add to history
      this.conversationHistory.push(
        { role: 'user', content: userMessage },
        { role: 'assistant', content: response }
      );
      
      logger.info('Chat response generated', { companyName, messageLength: userMessage.length });
      return response;
    } catch (error) {
      logger.error('Chat response generation failed', { error });
      throw error;
    }
  }

  getConversationHistory(): ConversationMessage[] {
    return this.conversationHistory;
  }

  clearHistory(): void {
    this.conversationHistory = [];
  }
}

export const chatAgent = new ChatAgent();

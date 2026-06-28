import { GoogleGenerativeAI, Content } from '@google/generative-ai';
import { environment } from '../config/environment';
import logger from '../utils/logger';

interface Message {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

export class CompanyResearchAgent {
  private client: GoogleGenerativeAI;
  private conversationHistory: Message[] = [];

  constructor() {
    this.client = new GoogleGenerativeAI(environment.gemini.apiKey);
  }

  async researchCompany(companyName: string): Promise<string> {
    try {
      const model = this.client.getGenerativeModel({ model: environment.gemini.model });
      const systemPrompt = `You are an expert AI research analyst. Provide comprehensive company intelligence in JSON format.`;
      
      const prompt = `Research the company: ${companyName}
      
Provide a detailed JSON response with:
- overview (description, founded, headquarters, founder, ceo)
- industry
- financials (revenue, employees)
- products (array)
- businessModel
- competitors (array)
- marketPosition
- technologyStack (array)
- swot (strengths, weaknesses, opportunities, threats)
- recentNews (array)
- aiInsights
- riskAssessment (array)
- opportunities (array)
- recommendations (array)`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();
      
      logger.info('Company research completed', { companyName });
      return response;
    } catch (error) {
      logger.error('Company research failed', { companyName, error });
      throw error;
    }
  }

  async analyzeComparisonBetweenCompanies(company1: string, company2: string): Promise<string> {
    try {
      const model = this.client.getGenerativeModel({ model: environment.gemini.model });
      
      const prompt = `Compare ${company1} and ${company2}.
      
Provide analysis on:
- Business model comparison
- Market position
- Financial performance
- Innovation capabilities
- Customer base
- Risk profile
- Overall investment recommendation

Format as detailed JSON.`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();
      
      logger.info('Company comparison completed', { company1, company2 });
      return response;
    } catch (error) {
      logger.error('Company comparison failed', { company1, company2, error });
      throw error;
    }
  }

  async generateSWOTAnalysis(companyName: string): Promise<string> {
    try {
      const model = this.client.getGenerativeModel({ model: environment.gemini.model });
      
      const prompt = `Generate a comprehensive SWOT analysis for ${companyName}.
      
Provide:
- Strengths (with competitive advantage analysis)
- Weaknesses (with impact assessment)
- Opportunities (with revenue potential)
- Threats (with likelihood assessment)
- Strategic summary

Format as detailed JSON.`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();
      
      logger.info('SWOT analysis completed', { companyName });
      return response;
    } catch (error) {
      logger.error('SWOT analysis failed', { companyName, error });
      throw error;
    }
  }

  async generateStrategicInsights(companyName: string, companyData: Record<string, unknown>): Promise<string> {
    try {
      const model = this.client.getGenerativeModel({ model: environment.gemini.model });
      
      const prompt = `Generate strategic business insights for ${companyName}.
      
Company data: ${JSON.stringify(companyData, null, 2)}
      
Provide insights on:
- Market trends affecting the company
- Competitive advantages
- 3-5 year outlook
- Strategic recommendations with timelines
- Risk mitigation strategies
- Top growth opportunities
- Investment potential

Format as detailed JSON.`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();
      
      logger.info('Strategic insights generated', { companyName });
      return response;
    } catch (error) {
      logger.error('Strategic insights generation failed', { companyName, error });
      throw error;
    }
  }
}

export const companyResearchAgent = new CompanyResearchAgent();

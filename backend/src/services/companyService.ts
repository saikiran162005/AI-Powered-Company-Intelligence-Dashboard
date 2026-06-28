import { companyRepository, Company } from '../repositories/companyRepository';
import { companyResearchAgent } from '../agents/companyResearchAgent';
import logger from '../utils/logger';

export interface CompanyResearchResult {
  company: Company;
  analysis: Record<string, unknown>;
}

export class CompanyService {
  async searchCompany(companyName: string): Promise<CompanyResearchResult> {
    try {
      // Check if company already exists
      let company = await companyRepository.findByName(companyName);
      
      if (company) {
        logger.info('Company found in database', { companyName });
        return {
          company,
          analysis: company.data as Record<string, unknown>,
        };
      }

      // Research company using AI agent
      logger.info('Starting company research', { companyName });
      const researchResult = await companyResearchAgent.researchCompany(companyName);
      
      // Parse AI response
      let analysisData: Record<string, unknown> = {};
      try {
        const jsonMatch = researchResult.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          analysisData = JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        logger.warn('Failed to parse AI response as JSON', { companyName, error: parseError });
        analysisData = { rawResponse: researchResult };
      }

      // Extract basic info from analysis
      const overview = analysisData.overview as Record<string, unknown> || {};
      
      // Create company record
      company = await companyRepository.create({
        name: companyName,
        overview: overview.description as string,
        industry: analysisData.industry as string,
        headquarters: overview.headquarters as string,
        founder: overview.founder as string,
        ceo: overview.ceo as string,
        revenue: analysisData.financials?.revenue as string,
        employees: analysisData.financials?.employees as number,
        website: overview.website as string,
        data: analysisData,
      });

      logger.info('Company research completed and saved', { companyName, id: company.id });

      return {
        company,
        analysis: analysisData,
      };
    } catch (error) {
      logger.error('Company search failed', { companyName, error });
      throw error;
    }
  }

  async getCompanyById(id: string): Promise<Company | null> {
    return companyRepository.findById(id);
  }

  async getCompanyByName(name: string): Promise<Company | null> {
    return companyRepository.findByName(name);
  }

  async getCompanyHistory(limit: number = 10, offset: number = 0): Promise<Company[]> {
    return companyRepository.findAll(limit, offset);
  }

  async deleteCompany(id: string): Promise<boolean> {
    return companyRepository.delete(id);
  }

  async compareCompanies(company1Name: string, company2Name: string): Promise<Record<string, unknown>> {
    try {
      logger.info('Starting company comparison', { company1Name, company2Name });
      const result = await companyResearchAgent.analyzeComparisonBetweenCompanies(company1Name, company2Name);
      
      let comparisonData: Record<string, unknown> = {};
      try {
        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          comparisonData = JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        logger.warn('Failed to parse comparison response as JSON', { error: parseError });
        comparisonData = { rawResponse: result };
      }

      logger.info('Company comparison completed', { company1Name, company2Name });
      return comparisonData;
    } catch (error) {
      logger.error('Company comparison failed', { company1Name, company2Name, error });
      throw error;
    }
  }
}

export const companyService = new CompanyService();

import { Request, Response } from 'express';
import { companyService } from '../services/companyService';
import { validateRequest, companySearchSchema } from '../utils/validators';
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../config/constants';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';

export class CompanyController {
  static search = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { companyName } = validateRequest(req.body, companySearchSchema);

    try {
      logger.info('Company search initiated', { companyName });
      const result = await companyService.searchCompany(companyName);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.COMPANY_RESEARCH_COMPLETE,
        data: {
          company: result.company,
          analysis: result.analysis,
        },
      });
    } catch (error) {
      logger.error('Company search error', { companyName, error });
      throw new AppError('Failed to research company', HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  });

  static getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const company = await companyService.getCompanyById(id);

      if (!company) {
        throw new AppError('Company not found', HTTP_STATUS.NOT_FOUND);
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: company,
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error('Failed to get company', { id, error });
      throw new AppError('Failed to retrieve company', HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  });

  static getHistory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    try {
      const companies = await companyService.getCompanyHistory(limit, offset);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.HISTORY_RETRIEVED,
        data: {
          companies,
          pagination: {
            page,
            limit,
            offset,
          },
        },
      });
    } catch (error) {
      logger.error('Failed to get company history', { error });
      throw new AppError('Failed to retrieve history', HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  });

  static delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const success = await companyService.deleteCompany(id);

      if (!success) {
        throw new AppError('Company not found', HTTP_STATUS.NOT_FOUND);
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Company deleted successfully',
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error('Failed to delete company', { id, error });
      throw new AppError('Failed to delete company', HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  });

  static compare = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { company1, company2 } = req.body;

    if (!company1 || !company2) {
      throw new AppError('Both company names are required', HTTP_STATUS.BAD_REQUEST);
    }

    try {
      logger.info('Comparing companies', { company1, company2 });
      const comparison = await companyService.compareCompanies(company1, company2);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: comparison,
      });
    } catch (error) {
      logger.error('Company comparison error', { company1, company2, error });
      throw new AppError('Failed to compare companies', HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  });
}

import { Request, Response } from 'express';
import { HTTP_STATUS } from '../config/constants';
import { asyncHandler } from '../middleware/errorHandler';
import logger from '../utils/logger';

export class HealthController {
  static check = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    logger.info('Health check endpoint called');
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'API is healthy',
      timestamp: new Date(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
    });
  });
}

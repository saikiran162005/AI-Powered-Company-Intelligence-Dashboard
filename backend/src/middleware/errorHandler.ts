import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants';

export interface ApiError extends Error {
  status?: number;
  details?: unknown;
}

export class AppError extends Error implements ApiError {
  status: number;
  details?: unknown;

  constructor(message: string, status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR, details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.details = details;
  }
}

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
  let error = err as ApiError;
  let status = error?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = error?.message || ERROR_MESSAGES.INTERNAL_ERROR;

  // Log error
  logger.error('Request error', {
    status,
    message,
    url: req.url,
    method: req.method,
    stack: error?.stack,
    details: error?.details,
  });

  // Validation error
  if (error?.name === 'ValidationError') {
    status = HTTP_STATUS.BAD_REQUEST;
  }

  // Database error
  if (error?.name === 'DatabaseError') {
    status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    message = ERROR_MESSAGES.DATABASE_ERROR;
  }

  res.status(status).json({
    success: false,
    error: {
      message,
      status,
      ...(process.env.NODE_ENV === 'development' && { details: error?.details, stack: error?.stack }),
    },
  });
};

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

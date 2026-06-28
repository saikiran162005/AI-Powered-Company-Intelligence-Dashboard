import { Request, Response, NextFunction } from 'express';
import { validateRequest, ValidationError } from '../utils/validators';
import Joi from 'joi';
import { HTTP_STATUS } from '../config/constants';

export const validateBody = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = validateRequest(req.body, schema);
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          error: {
            message: error.message,
            status: HTTP_STATUS.BAD_REQUEST,
          },
        });
      } else {
        next(error);
      }
    }
  };
};

export const validateQuery = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.query = validateRequest(req.query, schema);
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          error: {
            message: error.message,
            status: HTTP_STATUS.BAD_REQUEST,
          },
        });
      } else {
        next(error);
      }
    }
  };
};

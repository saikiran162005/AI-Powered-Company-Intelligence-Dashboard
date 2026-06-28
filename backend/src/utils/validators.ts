import Joi from 'joi';

export const companySearchSchema = Joi.object({
  companyName: Joi.string().required().trim().min(2).max(255),
}).required();

export const chatMessageSchema = Joi.object({
  companyId: Joi.string().uuid({ version: 'uuidv4' }).required(),
  message: Joi.string().required().trim().min(1).max(2000),
}).required();

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
}).optional();

export const validateRequest = (data: unknown, schema: Joi.ObjectSchema) => {
  const { error, value } = schema.validate(data, { 
    stripUnknown: true,
    abortEarly: false,
  });
  
  if (error) {
    const messages = error.details.map(detail => detail.message).join(', ');
    throw new ValidationError(messages);
  }
  
  return value;
};

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

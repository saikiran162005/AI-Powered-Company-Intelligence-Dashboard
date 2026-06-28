export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100, // 100 requests per window
} as const;

export const CACHE_DURATION = {
  COMPANY_DATA: 24 * 60 * 60 * 1000, // 24 hours
  CHAT_HISTORY: 60 * 60 * 1000, // 1 hour
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const ERROR_MESSAGES = {
  COMPANY_NOT_FOUND: 'Company not found',
  INVALID_REQUEST: 'Invalid request parameters',
  INTERNAL_ERROR: 'Internal server error',
  DATABASE_ERROR: 'Database connection error',
  AI_ERROR: 'AI service error',
  RATE_LIMIT_EXCEEDED: 'Too many requests, please try again later',
} as const;

export const SUCCESS_MESSAGES = {
  COMPANY_RESEARCH_COMPLETE: 'Company research completed successfully',
  CHAT_MESSAGE_SENT: 'Message sent successfully',
  HISTORY_RETRIEVED: 'History retrieved successfully',
} as const;

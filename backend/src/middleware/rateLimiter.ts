import rateLimit from 'express-rate-limit';
import { RATE_LIMIT, HTTP_STATUS } from '../config/constants';

export const rateLimiter = rateLimit({
  windowMs: RATE_LIMIT.WINDOW_MS,
  max: RATE_LIMIT.MAX_REQUESTS,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for health check
    return req.path === '/api/health';
  },
  handler: (req, res) => {
    res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({
      success: false,
      error: {
        message: 'Too many requests, please try again later.',
        status: HTTP_STATUS.TOO_MANY_REQUESTS,
      },
    });
  },
});

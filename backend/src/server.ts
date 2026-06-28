import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import { initializeDatabase, closeDatabase } from './database/connection';
import { environment, validateEnvironment } from './config/environment';
import logger from './utils/logger';
import { corsMiddleware } from './middleware/corsMiddleware';
import { rateLimiter } from './middleware/rateLimiter';
import { requestLogger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';

import companyRoutes from './routes/companyRoutes';
import chatRoutes from './routes/chatRoutes';
import healthRoutes from './routes/healthRoutes';

const app: Express = express();

// Validate environment
validateEnvironment();

// Security middleware
app.use(helmet());
app.use(corsMiddleware);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Logging
app.use(requestLogger);

// Rate limiting
app.use(rateLimiter);

// API routes
app.use('/api/company', companyRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/health', healthRoutes);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'AI Company Intelligence Platform API',
    version: '1.0.0',
    endpoints: {
      company: '/api/company',
      chat: '/api/chat',
      health: '/api/health',
    },
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Route not found',
      status: 404,
    },
  });
});

// Error handler
app.use(errorHandler);

// Initialize database and start server
async function startServer(): Promise<void> {
  try {
    // Initialize database
    await initializeDatabase();
    logger.info('Database initialized successfully');

    // Start server
    const server = app.listen(environment.port, () => {
      logger.info(`Server running on http://localhost:${environment.port}`);
      logger.info(`Environment: ${environment.nodeEnv}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      logger.info('SIGTERM signal received: closing HTTP server');
      server.close(async () => {
        logger.info('HTTP server closed');
        await closeDatabase();
        process.exit(0);
      });
    });

    process.on('SIGINT', async () => {
      logger.info('SIGINT signal received: closing HTTP server');
      server.close(async () => {
        logger.info('HTTP server closed');
        await closeDatabase();
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error('Failed to start server', { error });
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception', { error });
  process.exit(1);
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason: unknown) => {
  logger.error('Unhandled Rejection', { reason });
  process.exit(1);
});

startServer();

export default app;

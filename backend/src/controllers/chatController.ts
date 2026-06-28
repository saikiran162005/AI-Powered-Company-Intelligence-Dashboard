import { Request, Response } from 'express';
import { chatService } from '../services/chatService';
import { validateRequest, chatMessageSchema } from '../utils/validators';
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../config/constants';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';

export class ChatController {
  static sendMessage = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { companyId, message } = validateRequest(req.body, chatMessageSchema);

    try {
      logger.info('Processing chat message', { companyId, messageLength: message.length });
      const chatMessage = await chatService.sendMessage(companyId, message);

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: SUCCESS_MESSAGES.CHAT_MESSAGE_SENT,
        data: chatMessage,
      });
    } catch (error) {
      logger.error('Chat message error', { companyId, error });
      throw new AppError('Failed to process chat message', HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  });

  static getHistory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { companyId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = (page - 1) * limit;

    try {
      logger.info('Fetching chat history', { companyId });
      const messages = await chatService.getConversationHistory(companyId, limit, offset);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: {
          messages,
          pagination: {
            page,
            limit,
            offset,
          },
        },
      });
    } catch (error) {
      logger.error('Failed to get chat history', { companyId, error });
      throw new AppError('Failed to retrieve chat history', HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  });

  static clearHistory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { companyId } = req.params;

    try {
      logger.info('Clearing chat history', { companyId });
      await chatService.clearConversation(companyId);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Chat history cleared successfully',
      });
    } catch (error) {
      logger.error('Failed to clear chat history', { companyId, error });
      throw new AppError('Failed to clear chat history', HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  });
}

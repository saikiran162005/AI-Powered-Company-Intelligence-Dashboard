import { Router } from 'express';
import { ChatController } from '../controllers/chatController';
import { validateBody } from '../middleware/requestValidator';
import { chatMessageSchema } from '../utils/validators';

const router = Router();

// POST /api/chat/send - Send a chat message
router.post('/send', validateBody(chatMessageSchema), ChatController.sendMessage);

// GET /api/chat/:companyId - Get chat history for a company
router.get('/:companyId', ChatController.getHistory);

// DELETE /api/chat/:companyId - Clear chat history
router.delete('/:companyId', ChatController.clearHistory);

export default router;

import { Router } from 'express';
import { HealthController } from '../controllers/healthController';

const router = Router();

// GET /api/health - Health check
router.get('/', HealthController.check);

export default router;

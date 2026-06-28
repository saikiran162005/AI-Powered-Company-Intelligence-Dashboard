import { Router } from 'express';
import { CompanyController } from '../controllers/companyController';
import { validateBody } from '../middleware/requestValidator';
import { companySearchSchema } from '../utils/validators';

const router = Router();

// POST /api/company/search - Search for a company
router.post('/search', validateBody(companySearchSchema), CompanyController.search);

// GET /api/company/:id - Get company by ID
router.get('/:id', CompanyController.getById);

// GET /api/company - Get all companies (history)
router.get('/', CompanyController.getHistory);

// POST /api/company/compare - Compare two companies
router.post('/compare', CompanyController.compare);

// DELETE /api/company/:id - Delete a company
router.delete('/:id', CompanyController.delete);

export default router;

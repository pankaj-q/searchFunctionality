import {Router} from 'express';
import searchDocuments from '../controllers/searchController.js';

const router = Router();
router.get('/search', searchDocuments);

export default router;
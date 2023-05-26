import express from 'express';

import { createLibrary, deleteLibrary, getLibrary } from '../controllers/library.controller';

const router = express.Router();

router.post('/library', createLibrary);
router.get('/library', getLibrary);
router.delete('/library/:id', deleteLibrary);

export default router;

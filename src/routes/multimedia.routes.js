import {Router, application} from 'express';
import {getMultimedia} from '../controllers/multimedia.controller.js';
const router = Router();

router.get('/api/multimedia', getMultimedia)

export default router;
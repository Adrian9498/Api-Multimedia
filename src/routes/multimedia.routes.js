import {Router, application} from 'express';
import {getMultimedia,addMultimedia} from '../controllers/multimedia.controller.js';
const router = Router();

router.get('/api/multimedia', getMultimedia)
router.post('/api/agregarMultimedia', addMultimedia);

export default router;
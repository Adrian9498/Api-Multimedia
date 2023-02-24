import {Router, application} from 'express';
import {getMultimedia,addMultimedia} from '../controllers/multimedia.controller.js';
import {getCreators, addCreator, editCreator, deleteCreator} from '../controllers/creator.controller.js';
const router = Router();

router.get('/api/multimedia', getMultimedia)
router.post('/api/agregarMultimedia', addMultimedia);

router.get('/api/creator/', getCreators)
router.post('/api/creator/', addCreator)
router.put('/api/creator/:id', editCreator)
router.delete('/api/creator/:id', deleteCreator)

export default router;
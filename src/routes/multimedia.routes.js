import {Router,application} from 'express';
import {getAllMultimedia} from '../controllers/multimedia.controller.js';
const router = Router();

router.get('/api/multimedia', getAllMultimedia);
//router.get('/api/zoo/id/:id', getOneZoo);
//router.get('/api/zoo/budget', getZooBudget);
//router.get('/api/zoo/refuge', getRefuge);
//router.post('/api/zoo/findByNombre', getZooNombre);
//router.post('/api/zoo/createZoo', createZoo);
//router.delete('/api/zoo/deleteZoo/:id_zoo', deleteZoo);
export default router;
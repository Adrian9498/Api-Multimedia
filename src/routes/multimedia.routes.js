import {Router, application} from 'express';
import {getMultimedia,addMultimedia} from '../controllers/multimedia.controller.js';
import {getCreators, getPublishers, getTipoArchivo, addCreator, addPublisher, addTipoArchivo, deleteCreator, deletePublisher, deleteTipoArchivo} from '../controllers/multimedia.controller.js';
const router = Router();

// Ruta Get All / Obtener Todo
router.get('/api/multimedia', getMultimedia)
// Ruta con Endpoint Maestro para agregar multiples multimedias por validaciones
router.post('/api/agregarMultimedia', addMultimedia);

// Consultas a: Creators, Publishers, Tipo_Archivo 
router.get('/api/creators', getCreators)
router.get('/api/publishers', getPublishers)
router.get('/api/tipoarchivo', getTipoArchivo)
// Inserciones a: Creators, Publishers, Tipo_Archivo
router.post('/api/addCreator', addCreator)
router.post('/api/addPublisher', addPublisher)
router.post('/api/addTipoArchivo', addTipoArchivo)
// Eliminaciones de: Creators, Publishers, Tipo_Archivo
router.delete('/api/deleteCreator', deleteCreator)
router.delete('/api/deletePublisher', deletePublisher)
router.delete('/api/deleteTipoArchivo', deleteTipoArchivo)
export default router;
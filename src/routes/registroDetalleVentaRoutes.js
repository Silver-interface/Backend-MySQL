import express from 'express';
import { getDetalleVentaId, getDetalleVentasAll, updateDetalleVentaU, insertDetalleVentaN, deleteDetalleVentaD } from '../controller/registroDetalleVentaController.js';

const router = express.Router();

// Rutas para detalles de ventas
router.get('/detalleventas/:id', getDetalleVentaId);
router.get('/detalleventas', getDetalleVentasAll);
router.post('/detalleventas', insertDetalleVentaN);
router.put('/detalleventas/:id', updateDetalleVentaU);
router.delete('/detalleventas/:id', deleteDetalleVentaD);

export default router;

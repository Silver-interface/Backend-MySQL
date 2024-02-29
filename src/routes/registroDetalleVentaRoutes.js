import express from 'express';
import { getDetalleVenta, getDetalleVentas, updateDetalleVenta, insertDetalleVenta, deleteDetalleVenta } from '../controller/registroDetalleVentaController.js';

const router = express.Router();

// Rutas para detalles de ventas
router.get('/detalleventas/:id', getDetalleVenta);
router.get('/detalleventas', getDetalleVentas);
router.post('/detalleventas', insertDetalleVenta);
router.put('/detalleventas/:id', updateDetalleVenta);
router.delete('/detalleventas/:id', deleteDetalleVenta);

export default router;

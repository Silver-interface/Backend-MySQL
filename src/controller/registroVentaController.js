import { insertVenta as insertVentaService, getVentas as getVentasService, getVentaById as getVentaByIdService, updateVenta as updateVentaService, deleteVenta as deleteVentaService } from "../services/registroVenta.services.js";

const getVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const venta = await getVentaByIdService(id);
    if (!venta) {
      return res.status(404).json({ error: "NOT_FOUND" });
    }
    res.json(venta);
  } catch (error) {
    res.status(500).json({ error: "ERROR_GET_VENTA" });
  }
};

const getVentas = async (req, res) => {
  try {
    const ventas = await getVentasService();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: "ERROR_GET_VENTAS" });
  }
};

const updateVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updatedVenta = await updateVentaService(id, newData);
    res.json(updatedVenta);
  } catch (error) {
    res.status(500).json({ error: "ERROR_UPDATE_VENTA" });
  }
};

const insertVenta = async (req, res) => {
  try {
    const ventaData = req.body;
    const newVenta = await insertVentaService(ventaData);
    res.status(201).json(newVenta);
  } catch (error) {
    res.status(500).json({ error: "ERROR_INSERT_VENTA" });
  }
};

const deleteVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVenta = await deleteVentaService(id);
    res.json(deletedVenta);
  } catch (error) {
    res.status(500).json({ error: "ERROR_DELETE_VENTA" });
  }
};

export { getVenta, getVentas, updateVenta, insertVenta, deleteVenta };

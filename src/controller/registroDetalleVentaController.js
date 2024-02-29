import { insertDetalleVenta, getDetalleVentas, getDetalleVentaById, updateDetalleVenta, deleteDetalleVenta } from "../services/registroDetalleVentaService.js";
import { handleHttp } from "../utils/httpHandlers.js";

const getDetalleVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const detalleVenta = await getDetalleVentaById(id);
    const data = detalleVenta ? detalleVenta : "NOT_FOUND";
    res.send(data);
  } catch (error) {
    handleHttp(res, "ERROR_GET_DETALLE_VENTA");
  }
};

const getDetalleVentas = async (req, res) => {
  try {
    const detalleVentas = await getDetalleVentas();
    res.send(detalleVentas);
  } catch (error) {
    handleHttp(res, "ERROR_GET_DETALLE_VENTAS");
  }
};

const updateDetalleVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updatedDetalleVenta = await updateDetalleVenta(id, newData);
    res.send(updatedDetalleVenta);
  } catch (error) {
    handleHttp(res, "ERROR_UPDATE_DETALLE_VENTA");
  }
};

const insertDetalleVenta = async (req, res) => {
  try {
    const detalleVentaData = req.body;
    const newDetalleVenta = await insertDetalleVenta(detalleVentaData);
    res.send(newDetalleVenta);
  } catch (error) {
    handleHttp(res, "ERROR_INSERT_DETALLE_VENTA");
  }
};

const deleteDetalleVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDetalleVenta = await deleteDetalleVenta(id);
    res.send(deletedDetalleVenta);
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_DETALLE_VENTA");
  }
};

export { getDetalleVenta, getDetalleVentas, updateDetalleVenta, insertDetalleVenta, deleteDetalleVenta };

import { insertVenta, getVentas, getVentaById, updateVenta, deleteVenta } from "../services/ventaService.js";
import { handleHttp } from "../utils/httpHandlers.js";

const getVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const venta = await getVentaById(id);
    const data = venta ? venta : "NOT_FOUND";
    res.send(data);
  } catch (error) {
    handleHttp(res, "ERROR_GET_VENTA");
  }
};

const getVentas = async (req, res) => {
  try {
    const ventas = await getVentas();
    res.send(ventas);
  } catch (error) {
    handleHttp(res, "ERROR_GET_VENTAS");
  }
};

const updateVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updatedVenta = await updateVenta(id, newData);
    res.send(updatedVenta);
  } catch (error) {
    handleHttp(res, "ERROR_UPDATE_VENTA");
  }
};

const insertVenta = async (req, res) => {
  try {
    const ventaData = req.body;
    const newVenta = await insertVenta(ventaData);
    res.send(newVenta);
  } catch (error) {
    handleHttp(res, "ERROR_INSERT_VENTA");
  }
};

const deleteVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVenta = await deleteVenta(id);
    res.send(deletedVenta);
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_VENTA");
  }
};

export { getVenta, getVentas, updateVenta, insertVenta, deleteVenta };

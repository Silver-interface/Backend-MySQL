import Venta from "../models/ventaModel.js";
import {insertDetalleVenta} from "./registroDetalleVenta.services.js"

const insertVenta = async (ventaData) => {
  try {
		const detalleVenta = {
		  ID_PRODUCTO: ventaData.ID_PRODUCTO,
      CANTIDAD: ventaData.CANTIDAD,
      PRECIO: ventaData.PRECIO,
      TOTAL: ventaData.TOTAL
		}
		insertDetalleVenta(detalleVenta)
    const newVenta = await Venta.create(ventaData);
    return newVenta;
  } catch (error) {
    throw new Error(`Error al insertar la venta: ${error.message}`);
  }
};

const getVentas = async () => {
  try {
    const ventas = await Venta.findAll();
    return ventas;
  } catch (error) {
    throw new Error(`Error al obtener las ventas: ${error.message}`);
  }
};

const getVentaById = async (id) => {
  try {
    const venta = await Venta.findByPk(id);
    if (!venta) {
      throw new Error("Venta no encontrada");
    }
    return venta;
  } catch (error) {
    throw new Error(`Error al obtener la venta: ${error.message}`);
  }
};

const updateVenta = async (id, newData) => {
  try {
    const venta = await Venta.findByPk(id);
    if (!venta) {
      throw new Error("Venta no encontrada");
    }
    await venta.update(newData);
    return venta;
  } catch (error) {
    throw new Error(`Error al actualizar la venta: ${error.message}`);
  }
};

const deleteVenta = async (id) => {
  try {
    const venta = await Venta.findByPk(id);
    if (!venta) {
      throw new Error("Venta no encontrada");
    }
    await venta.destroy();
    return venta;
  } catch (error) {
    throw new Error(`Error al eliminar la venta: ${error.message}`);
  }
};

export { insertVenta, getVentas, getVentaById, updateVenta, deleteVenta };

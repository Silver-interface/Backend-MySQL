import DetalleVenta from "../models/detalleVentaModel.js"
import insertVenta from "./registroVenta.services.js"
import {getCantidadProductoById, updateProducto} from "./product.services.js"


const getCantidadProductoById = async (detalleVenta) => {
	try {
    const cantidadProducto = await getCantidadProductoById(detalleVenta.ID_PRODUCTO);
    return cantidadProducto;
  } catch (error) {
    throw new Error(`Error al obtener la cantidad del producto: ${error.message}`);
  }
}

const restarCantidadProducto = async (detalleVenta)=>{
	try {
    const cantidadProducto = await getCantidadProductoById(detalleVenta.ID_PRODUCTO);
    if (cantidadProducto <= 0) {
      throw new Error("No se puede restar una cantidad menor o igual a 0");
    }else{
			if (cantidadProducto>=detalleVenta.CANTIDAD)
			{
        const actualizarCantidad = cantidadProducto - detalleVenta.CANTIDAD
				const producto = {
					ID_PRODUCTO:detalleVenta.ID_PRODUCTO,
          CANTIDAD:actualizarCantidad,
          ESTADO_ENVÍO:detalleVenta.ESTADO_ENVÍO,
          PRECIO:detalleVenta.PRECIO
				}
				updateProducto(detalleVenta.ID_PRODUCTO, producto)
			}else{
				throw new Error("No hay stock")
			}
			
		}
    return actualizarCantidad ;
  } catch (error) {
    throw new Error(`Error al restar la cantidad del producto: ${error.message}`);
  }
}

const insertDetalleVenta = async (detalleVentaData) => {
  try {
		restarCantidadProducto(detalleVentaData)
    const newDetalleVenta = await DetalleVenta.create(detalleVentaData);
    return newDetalleVenta;
  } catch (error) {
    throw new Error(`Error al insertar la Detalle de la Venta: ${error.message}`);
  }
};

const getDetalleVentas = async () => {
  try {
    const detalleVentas = await DetalleVenta.findAll();
    return detalleVentas;
  } catch (error) {
    throw new Error(`Error al obtener las Detalle de la Ventas: ${error.message}`);
  }
};

const getDetalleVentaById = async (id) => {
  try {
    const detalleVenta = await DetalleVenta.findByPk(id);
    if (!detalleVenta) {
      throw new Error("DetalleVenta no encontrada");
    }
    return DetalleVenta;
  } catch (error) {
    throw new Error(`Error al obtener la DetalleVenta: ${error.message}`);
  }
};

const updateDetalleVenta = async (id, newData) => {
  try {
    const detalleVenta = await DetalleVenta.findByPk(id);
    if (!detalleVenta) {
      throw new Error("DetalleVenta no encontrada");
    }
    await DetalleVenta.update(newData);
    return DetalleVenta;
  } catch (error) {
    throw new Error(`Error al actualizar la DetalleVenta: ${error.message}`);
  }
};

const deleteDetalleVenta = async (id) => {
  try {
    const detalleVenta = await DetalleVenta.findByPk(id);
    if (!detalleVenta) {
      throw new Error("DetalleVenta no encontrada");
    }
    await DetalleVenta.destroy();
    return DetalleVenta;
  } catch (error) {
    throw new Error(`Error al eliminar la DetalleVenta: ${error.message}`);
  }
};

export { insertDetalleVenta, getDetalleVentas, getDetalleVentaById, updateDetalleVenta, deleteDetalleVenta, restarCantidadProducto };

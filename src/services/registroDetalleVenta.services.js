import DetalleVenta from "../models/detalleVentaModel.js";
import { getCantidadProductoById, updateProducto } from "./product.services.js";

const getCantidadProductoByIda = async (detalleVenta) => {
  try {
    const cantidadProducto = await getCantidadProductoById(detalleVenta.ID_PRODUCTO);
    return cantidadProducto;
  } catch (error) {
    throw new Error(`Error al obtener la cantidad del producto: ${error.message}`);
  }
};

const restarCantidadProducto = async (detalleVenta) => {
  try {
    let actualizarCantidad = 0;
    const cantidadProducto = await getCantidadProductoById(detalleVenta.ID_PRODUCTO);
    
    if (cantidadProducto <= 0) {
      throw new Error("No hay suficiente stock para este producto.");
    } else if (cantidadProducto < detalleVenta.CANTIDAD) {
      throw new Error("No hay suficiente stock disponible para realizar esta venta.");
    } else {
      actualizarCantidad = cantidadProducto - detalleVenta.CANTIDAD;

      const producto = {
        ID_PRODUCTO: detalleVenta.ID_PRODUCTO,
        CANTIDAD: actualizarCantidad,
        ESTADO_ENVÍO: detalleVenta.ESTADO_ENVÍO,
        PRECIO: detalleVenta.PRECIO
      };

      await updateProducto(detalleVenta.ID_PRODUCTO, producto);
    }
    
    return actualizarCantidad;
  } catch (error) {
    throw new Error(`Error al restar la cantidad del producto: ${error.message}`);
  }
};

const insertDetalleVenta = async (listaDetalleVenta) => {
  try {
    const detalleVentas = [];
    for (const detalleVentaData of listaDetalleVenta) {
      await restarCantidadProducto(detalleVentaData);
      const newDetalleVenta = await DetalleVenta.create(detalleVentaData);
      detalleVentas.push(newDetalleVenta);
    }
    return detalleVentas;
  } catch (error) {
    throw new Error(`Error al insertar los detalles de la venta: ${error.message}`);
  }
};

const obtenerProductosMasVendidos = async () => {
  try {
    const detallesVentas = await DetalleVenta.findAll();

    const productosVendidos = {};
    detallesVentas.forEach(detalle => {
      const productoId = detalle.ID_PRODUCTO;
      if (productosVendidos[productoId]) {
        productosVendidos[productoId] += detalle.CANTIDAD;
      } else {
        productosVendidos[productoId] = detalle.CANTIDAD;
      }
    });

    const productosOrdenados = Object.keys(productosVendidos).sort((a, b) => productosVendidos[b] - productosVendidos[a]);

    const productosMasVendidos = productosOrdenados.slice(0, 5).map(Number);

    return productosMasVendidos;
  } catch (error) {
    throw new Error(`Error al obtener los productos más vendidos: ${error.message}`);
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
    return detalleVenta;
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
    return detalleVenta;
  } catch (error) {
    throw new Error(`Error al eliminar la DetalleVenta: ${error.message}`);
  }
};

export { insertDetalleVenta, getDetalleVentas, getDetalleVentaById, updateDetalleVenta, deleteDetalleVenta, restarCantidadProducto, obtenerProductosMasVendidos };

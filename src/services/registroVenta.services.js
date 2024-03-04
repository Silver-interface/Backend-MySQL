import Venta from "../models/ventaModel.js";
import User from "../models/userModel.js";
import enviarCorreo from "./mailer.services.js";

const insertVenta = async (ventaData) => {
  try {
    const newVenta = await Venta.create(ventaData);

    const usuario = await User.findByPk(newVenta.ID_USUARIO);
    const nombreUsuario = usuario ? `${usuario.NOMBRE_USUARIO} ${usuario.APELLIDO_USUARIO}` : 'Usuario desconocido';

    const correoOptions = {
      from: process.env.EMAIL_FROM,
      to: usuario ? usuario.CORREO : process.env.EMAIL_TO,
      subject: 'Confirmacion de compra !',
      html: `
        <h1>Detalles de la compra</h1>
        <h3>Compra realizada en GeneralSHOP</h3>
        <p>Numero de factura: ${newVenta.ID_VENTA}</p>
        <p>Nombre del usuario: ${nombreUsuario}</p>
        <p>Fecha de venta: ${newVenta.FECHA_VENTA}</p>
        <p>Total: ${newVenta.TOTAL}$ COP</p>
        <p>Fecha de entrega: ${newVenta.FECHA_ENTREGA}</p>
      `
    };

    await enviarCorreo(correoOptions);

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

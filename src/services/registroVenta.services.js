import Venta from "../models/ventaModel.js";
import enviarCorreo from "./mailer.services.js";

const enviarCorreoElectronico = async (ventaData, newVenta) => {
  try {
    const emailContent = `
      <h1>Agradecemos tu confianza</h1>
      <h3>Compra realizada en GeneralSHOP</h3>
      <p><h5>Numero de factura: </h5> ${newVenta.ID_VENTA}</p>
      <p><h5>Nombre: </h5> ${ventaData.name}</p>
      <p><h5>Apellido: </h5> ${ventaData.lastName}</p>
      <p><h5>Email: </h5> ${ventaData.email}</p>
      <p><h5>Dirección: </h5> ${ventaData.address}</p>
      <p><h5>Tipo de ID: </h5> ${ventaData.IdType}</p>
      <p><h5>Número de teléfono: </h5> ${ventaData.phoneNumber}</p>
      <p><h5>Carrito de compras:</h5></p>
      <ul style="list-style-type: none; padding: 0;"> <!-- Estilos para quitar los puntos de la lista y eliminar el padding -->
        ${ventaData.cart.map(item => `
          <li style="margin-bottom: 20px; border-bottom: 1px solid #ccc;"> <!-- Estilos para agregar un margen inferior y una línea divisoria -->
            <p><h5>ID DEL PRODUCTO:</h5> ${item.ID_PRODUCTO}</p> <!-- Aplicamos el estilo h5 al texto -->
            <p><h5>NOMBRE_PRODUCTO:</h5> ${item.NOMBRE_PRODUCTO}</p>
            <p><h5>TALLA:</h5> ${item.TALLA}</p>
            <p><h5>CANTIDAD:</h5> ${item.CANTIDAD}</p>
            <p><h5>PRECIO:</h5> $${item.PRECIO}COP</p>
            <img src="${item.IMAGEN}" alt="Imagen del producto" style="max-width: 200px;"> <!-- Aplicamos el tamaño máximo de la imagen -->
          </li>
        `).join('')}
      </ul>
    `;
    const correoOptions = {
      from: process.env.EMAIL_FROM,
      to: ventaData.email,
      subject: 'Confirmacion de compra',
      html: emailContent
    };

    await enviarCorreo(correoOptions);

    console.log("Correo electrónico enviado correctamente");
  } catch (error) {
    throw new Error(`Error al enviar el correo electrónico: ${error.message}`);
  }
};

const calcularTotal = (cart) => {
  let total = 0;
  for (const item of cart) {
    total += item.PRECIO * item.CANTIDAD;
  }

  return total;
};

const calcularFechaEntrega = (fechaActual) => {
  const fechaEntrega = new Date(fechaActual);
  fechaEntrega.setDate(fechaEntrega.getDate() + 3);
  return fechaEntrega;
};

const insertVenta = async (ventaData) => {
  try {
    const ventaPrincipalData = {
      ID_USUARIO: ventaData.ID_USUARIO,
      FECHA_VENTA: new Date(),
      TOTAL: calcularTotal(ventaData.cart),
      FECHA_ENTREGA: calcularFechaEntrega(new Date()),
    };
    const newVenta = await Venta.create(ventaPrincipalData);
    await enviarCorreoElectronico(ventaData, newVenta);

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

import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import User from "./userModel.js";
import DetalleVenta from "./detalleVentaModel.js";

const Venta = sequelize.define(
  "venta",
  {
    ID_VENTA: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ID_DETALLE_VENTA:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: DetalleVenta,
        key: "ID_DETALLE_VENTA",
    }
  },
    ID_USUARIO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "ID_USUARIO",
      },
    },
    FECHA_VENTA: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    TOTAL: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    FECHA_ENTREGA: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {}
);

Venta.belongsTo(User, { foreignKey: "ID_USUARIO", as: "usuario" });
Venta.belongsTo(DetalleVenta, { foreignKey: "ID_DETALLE_VENTA", as: "detalleVenta"});

export default Venta;
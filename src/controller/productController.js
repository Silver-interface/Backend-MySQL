import { insertProducto as insertProduct, getProductos as getProducts, getProductoById, updateProducto as updateProduct, deleteProducto as deleteProduct } from "../services/product.services.js";

const getProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await getProductoById(id);
    if (!producto) {
      return res.status(404).json({ error: "NOT_FOUND" });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "ERROR_GET_PRODUCT" });
  }
};

const getProductos = async (req, res) => {
  try {
    const productos = await getProducts();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "ERROR_GET_PRODUCTS" });
  }
};

const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updatedProducto = await updateProduct(id, newData);
    res.json(updatedProducto);
  } catch (error) {
    res.status(500).json({ error: "ERROR_UPDATE_PRODUCT" });
  }
};

const insertProducto = async (req, res) => {
  try {
    const productoData = req.body;
    const newProducto = await insertProduct(productoData);
    res.status(201).json(newProducto);
  } catch (error) {
    res.status(500).json({ error: "ERROR_INSERT_PRODUCT" });
  }
};

const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProducto = await deleteProduct(id);
    res.json(deletedProducto);
  } catch (error) {
    res.status(500).json({ error: "ERROR_DELETE_PRODUCT" });
  }
};

export { getProducto, getProductos, updateProducto, insertProducto, deleteProducto };

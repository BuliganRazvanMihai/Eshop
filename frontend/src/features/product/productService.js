import axios from "axios";

const listProducts = async () => {
  const response = await axios.get("http://127.0.0.1:5000/api/products");

  return response.data;
};

const displayProduct = async (productId) => {
  const response = await axios.get(
    `http://127.0.0.1:5000/api/products/${productId}`
  );

  return response.data;
};

const productService = {
  listProducts,
  displayProduct,
};

export default productService;

import Product from "../models/Product.js";
import products from "../json/products.json" with { type: "json" };

const seedProducts = async () => {
  try {
    await Product.deleteMany({});
    console.log("Productos eliminados.");
    await Product.insertMany(products);
    console.log("Productos insertados.");
  } catch (error) {
    console.error("Error al sembrar productos:", error);
  }
};

export default seedProducts;

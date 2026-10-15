import { connectToDatabase } from "../config/database.js";
import seedProducts from "./seedProducts.js";

const seed = async () => {
  try {
    await connectToDatabase();
    await seedProducts();
    console.log("Datos sembrados exitosamente.");
    process.exit(0);
  } catch (error) {
    console.error("Error al sembrar datos:", error);
    process.exit(1);
  }
};

seed();

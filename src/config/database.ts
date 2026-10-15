import mongoose from "mongoose";

export async function connectToDatabase(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("La variable de entorno MONGODB_URI es obligatoria.");
  }

  await mongoose.connect(mongoUri);
  console.log("Conexión a la base de datos exitosa.");
}

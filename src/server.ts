import "dotenv/config";
import { app } from "./app.js";
import { connectToDatabase } from "./config/database.js";

const port = Number(process.env.PORT) || 3000;

async function startServer(): Promise<void> {
  try {
    await connectToDatabase();

    app.listen(port, () => {
      console.log(`Servidor ejecutándose en el puerto ${port}.`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor.", error);
    process.exitCode = 1;
  }
}

void startServer();

import morgan from "morgan";
import express from "express";
import router from "./routes/product.routes.js";
import cors from "cors";

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"],
  optionsSuccessStatus: 200
};

export const app = express();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(router);

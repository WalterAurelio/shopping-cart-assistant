import morgan from "morgan";
import express from "express";
import router from "./routes/product.routes.js";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(router);

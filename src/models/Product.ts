import { model, Schema } from "mongoose";
import type { IProduct, UnidadMedida } from "../interfaces/IProduct.js";

// const unidadesMedida: UnidadMedida[] = ["g", "kg", "ml", "l", "unidad"];

const productSchema = new Schema<IProduct>(
  {
    categoria: {
      type: String,
      required: true
    },
    marca: {
      type: String,
      required: true
    },
    precio: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;

import { model, Schema } from "mongoose";
import type { IProduct, UnidadMedida } from "../interfaces/IProduct.js";

const unidadesMedida: UnidadMedida[] = ["g", "kg", "ml", "l", "unidad"];

const productSchema = new Schema<IProduct>(
  {
    nombre: {
      type: String,
      required: true
    },
    marca: {
      type: String,
      required: true
    },
    contenido: {
      valor: {
        type: Number,
        required: true
      },
      unidad: {
        type: String,
        enum: unidadesMedida,
        required: true
      }
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

export const Product = model<IProduct>("Product", productSchema);

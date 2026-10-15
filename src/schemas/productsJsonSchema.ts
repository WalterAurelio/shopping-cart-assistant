import * as z from "zod";

export const productsJsonSchema = {
  type: "object",
  properties: {
    products: {
      type: "array",
      description: "Lista de productos detectados en la imagen",
      items: {
        type: "object",
        properties: {
          categoria: {
            type: "string",
            description: "Categoría genérica del producto. Por ejemplo: 'Leche', 'Gaseosa', 'Café', 'Aceite', etc."
          },
          marca: {
            type: "string",
            description: "Marca del producto."
          },
          cantidad: {
            type: "number",
            description: "Cantidad de un mismo producto detectado. Un producto se considera el mismo si tiene la misma categoría y marca."
          }
        },
        required: ["categoria", "marca", "cantidad"]
      }
    }
  },
  required: ["products"]
} satisfies z.core.JSONSchema.JSONSchema;

const productsSchema = z.fromJSONSchema(productsJsonSchema);

export default productsSchema;

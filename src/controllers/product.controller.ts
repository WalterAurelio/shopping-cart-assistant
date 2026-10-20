import type { Request, Response } from "express";
import { ai } from "../gemini.js";
import Product from "../models/Product.js";
import productsSchema, { productsJsonSchema } from "../schemas/productsJsonSchema.js";

export async function getProducts(req: Request, res: Response): Promise<void> {
  console.log("Petición recibida...");

  try {
    // const file = req.file;
    const files = req.files as Express.Multer.File[];

    /* if (!file) {
      res.status(400).json({
        message: "No se ha proporcionado ningún archivo"
      });
      return;
    } */
    if (files.length === 0) {
      res.status(400).json({
        message: "No se ha proporcionado ningún archivo"
      });
      return;
    }

    const file = files[0];
    const imageB64 = file.buffer.toString("base64");
    const interaction = await ai.interactions.create({
      model: "gemini-3.5-flash-lite",
      input: [
        { type: "text", text: "Describe los productos que ves en esta imagen." },
        {
          type: "image",
          data: imageB64,
          mime_type: "image/jpeg"
        }
      ],
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: productsJsonSchema
      }
    });

    const parsedData = productsSchema.parse(JSON.parse(interaction.output_text!)) as {
      products: {
        categoria: string;
        marca: string;
        cantidad: number;
      }[];
    };

    // Array de productos detectados en la imagen
    const detectedProducts = parsedData.products;
    console.log("Productos detectados:", detectedProducts);

    // Productos sin el campo cantidad, solo con categoria y marca
    const filteredProducts = detectedProducts.map((product) => ({
      categoria: product.categoria,
      marca: product.marca
    }));

    const foundProducts = await Product.find({
      $or: filteredProducts
    });
    console.log("Productos encontrados:", foundProducts);

    const totalPrice = foundProducts.reduce((total, product) => {
      const currentProduct = detectedProducts.find((p) => p.categoria === product.categoria && p.marca === product.marca);

      return total + product.precio * (currentProduct?.cantidad ?? 0);
    }, 0);

    res.status(200).json({
      message: "Archivo procesado correctamente",
      data: {
        totalPrice,
        detectedProducts
      }
    });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({
      message: "Error al obtener los productos"
    });
  }
}

export async function getTotalPrice(req: Request, res: Response): Promise<void> {
  const { products } = req.body as {
    products: {
      categoria: string;
      marca: string;
      cantidad: number;
    }[];
  };
  console.log("Productos recibidos:", products);

  // Productos sin el campo cantidad, solo con categoria y marca
  const filteredProducts = products.map((product) => ({
    categoria: product.categoria,
    marca: product.marca
  }));

  const foundProducts = await Product.find({
    $or: filteredProducts
  });
  console.log("Productos encontrados:", foundProducts);

  const totalPrice = foundProducts.reduce((total, product) => {
    const currentProduct = products.find((p) => p.categoria === product.categoria && p.marca === product.marca);

    return total + product.precio * (currentProduct?.cantidad ?? 0);
  }, 0);
  console.log("Precio total calculado:", totalPrice);

  res.status(200).json({
    message: "Archivo procesado correctamente",
    data: {
      totalPrice,
      detectedProducts: products
    }
  });
}

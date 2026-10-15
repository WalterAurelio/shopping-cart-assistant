export type UnidadMedida = "g" | "kg" | "ml" | "l" | "unidad";

export interface IProduct {
  nombre: string;
  marca: string;
  /* contenido: {
    valor: number;
    unidad: UnidadMedida;
  }; */
  precio: number;
  // categoria?: string;
  // codigoBarras?: string;
}

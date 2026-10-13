import type { Request, Response } from "express";

export function getProducts(_request: Request, response: Response): void {
  response.status(200).json({
    message: "Estos son los productos"
  });
}

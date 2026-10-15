import { Router } from "express";
import { getProducts } from "../controllers/product.controller.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.post("/products", upload.single("cart_image"), getProducts);

export default router;

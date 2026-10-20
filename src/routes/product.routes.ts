import { Router } from "express";
import { getProducts, getTotalPrice } from "../controllers/product.controller.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

// router.post("/products", upload.single("cart_image"), getProducts);
router.post("/upload", upload.array("cart_image", 5), getProducts);
router.post("/products", getTotalPrice);

export default router;

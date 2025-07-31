import { Router } from "express";
import { getAllProducts, createProduct } from "../controllers/productsController.js";
import { verifyToken, requireSupplier } from "../middleware/verifyToken.js";

const router = Router();

router.get("/", getAllProducts); 
router.post("/", verifyToken, requireSupplier, createProduct); // Only suppliers can create products

export default router;
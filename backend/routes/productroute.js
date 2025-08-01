import { Router } from "express";
import { getAllProducts, createProduct } from "../controllers/productsController.js";
import { verifyToken, requireSupplier } from "../middleware/verifyToken.js";
import upload from "../utils/fileupload.js";
const router = Router();

router.get("/", getAllProducts); 
router.post("/", verifyToken, requireSupplier, upload.single("labReport"),createProduct); // Only suppliers can create products

export default router;
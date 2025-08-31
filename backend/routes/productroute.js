import { Router } from "express";
import { getAllProducts, createProduct , deleteProduct} from "../controllers/productsController.js";
import { verifyToken, requireSupplier } from "../middleware/verifyToken.js";
import upload from "../utils/fileupload.js";
const router = Router();

router.get("/", getAllProducts); 
router.post("/", verifyToken, requireSupplier, upload.single("labReport"), createProduct); // Only suppliers can create products
router.delete("/:id", verifyToken, requireSupplier, deleteProduct);

export default router;
import { Router } from "express";
import { getAllProducts, createProduct , deleteProduct} from "../controllers/productsController.js";
import { verifyToken, requireSupplier } from "../middleware/verifyToken.js";
const router = Router();

router.get("/", getAllProducts); 
router.post("/", verifyToken, requireSupplier, createProduct); 
router.delete("/:id", verifyToken, requireSupplier, deleteProduct);

export default router;
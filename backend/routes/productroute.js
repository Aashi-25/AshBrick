import { Router } from "express";
import { getAllProducts,createProduct } from "../controllers/productsController.js";
const productroute = Router();

productroute.get("/",getAllProducts);
productroute.post("/",createProduct);


export default productroute;

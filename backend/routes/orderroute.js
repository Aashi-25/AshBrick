
import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";


import { verifyToken } from "../middleware/verifyToken.js";

const orderrouter = Router();


orderrouter.post("/", verifyToken, createOrder);
orderrouter.get("/", verifyToken, getAllOrders);
orderrouter.get("/:id", verifyToken, getOrderById);
orderrouter.put("/:id", verifyToken, updateOrder);
orderrouter.delete("/:id", verifyToken, deleteOrder);

export default orderrouter;

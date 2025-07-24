import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
} from "../controllers/orderController.js";

const orderrouter = Router();

orderrouter.post("/", createOrder);

orderrouter.get("/", getAllOrders);

orderrouter.get("/:id", getOrderById);

export default orderrouter;

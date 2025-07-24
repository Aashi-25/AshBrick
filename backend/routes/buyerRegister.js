import { Router } from "express";
import { registerBuyer } from "../controllers/buyerController.js";
const buyerRegisterRouter = Router();

buyerRegisterRouter.post("/", registerBuyer);

export default buyerRegisterRouter;

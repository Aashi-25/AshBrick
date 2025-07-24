import express from "express";
import cors from "cors";
import "dotenv/config";
import { con } from "./db/pgdb.js";

// Routes
import orderrouter from "./routes/orderroute.js";
import productroute from "./routes/productroute.js";
import buyerRegisterRouter from "./routes/buyerRegister.js";
const app = express();
const port =  3000 || process.env.PORT; 

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Hy Mate I am backend!");
});

// API Routes
app.use("/orders", orderrouter);
app.use("/products", productroute);
app.use("/register-buyer", buyerRegisterRouter);




// Start Server
app.listen(port, () => {
  console.log(`✅ App is listening on port ${port}`);
});

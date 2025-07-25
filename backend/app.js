import express from "express";
import cors from "cors";
import "dotenv/config";
import { con } from "./db/supabasesClients.js";

// Routes
import orderrouter from "./routes/orderroute.js";
import productroute from "./routes/productroute.js";
import buyerRegisterRouter from "./routes/buyerRegister.js";

const app = express();
const port =  3000 || process.env.PORT ; 

// Middleware
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send(" Hy Mate! Backend is up and running.");
});


app.use("/api/orders", orderrouter);                  
app.use("/api/products", productroute);
app.use("/api/buyers/register", buyerRegisterRouter); 


app.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
});

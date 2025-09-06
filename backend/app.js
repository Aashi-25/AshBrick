import express from "express";
import cors from "cors";
import "dotenv/config";
import { con } from "./db/supabasesClients.js";
import { verifyToken, requireBuyer } from "./middleware/verifyToken.js"; 

// Routes import
import orderrouter from "./routes/orderroute.js";
import productroute from "./routes/productroute.js";
import buyerRegisterRouter from "./routes/buyerRegister.js";
import predictroute from "./routes/predictroute.js";
const app = express();
const port = 3000 || process.env.PORT;

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.get("/", (req, res) => {
  res.send("<h2>Hy Mate! You are Awesome and Backend is running.</h2>");
});

// Routes 
app.use("/api/orders", verifyToken, requireBuyer, orderrouter); 
app.use("/api/products", productroute); 
app.use("/api/buyers/register", buyerRegisterRouter); 
app.use("/delete", productroute);
app.use("/api",predictroute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
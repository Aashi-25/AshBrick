import express from "express"
import cors from "cors";
const app = express();
import "dotenv/config";
const port = 3000  || process.env.PORT;



app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Hy Mate I am backend!");

})

app.listen(port,(req,res)=>{
    console.log(`App is listening  to the port ${port}`);
    
})
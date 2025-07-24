
import {Client} from "pg";
import "dotenv/config";
const pass = process.env.DBPASS;
const con = new Client({
    port:5432,
    host:"localhost",
    password: pass,
    database:"Ashbrick",
    user:"postgres",
})


con.connect().then(()=>{
    console.log("DB connect Sucessfully!");
    
})



export {con};
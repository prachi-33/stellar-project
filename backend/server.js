import express from "express";
import mainRouter from "./routes/index.js";
import cors from "cors";

const app=express();
app.use(cors());
app.use(express.json());
app.use('/api',mainRouter);


app.listen(3000,()=>{
    console.log("Server running on port 3000");
});

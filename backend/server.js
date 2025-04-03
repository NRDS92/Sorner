import express from "express"
import cors from "cors"
import "dotenv/config"
import path from "path"
import { fileURLToPath } from "url";

import connectDB from "./config/mongodb.js"
import connectCLoudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoutes.js"
import cartRouter from "./routes/cartRoutes.js"
import orderRouter from "./routes/orderRoutes.js"



// Definir __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App config

const app = express()
const port = process.env.PORT || 8000
connectDB()
connectCLoudinary()

// Servir frontend
app.use("/app", express.static(path.join(__dirname, "frontend-build")));
app.get("/app/*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend-build", "index.html"));
});

// Servir admin
app.use("/admin", express.static(path.join(__dirname, "admin-build")));
app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(__dirname, "admin-build", "index.html"));
});


// Middleware 

app.use(express.json())
app.use(cors())

// api End points
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port, ()=>console.log("Running server on port: " + port))

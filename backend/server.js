import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import smsRouter from "./routes/smsRoutes.js"; 


// App Config
const app = express();
const port = process.env.PORT ;

connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/sms", smsRouter); // New SMS route

// Test Route
app.get("/", (req, res) => {
  res.send("API is working!");
});

app.listen(port, () => console.log(`Server started on PORT: ${port}`));

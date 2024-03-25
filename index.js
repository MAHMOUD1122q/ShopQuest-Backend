import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRouter from "./routers/auth.js";
import productRouter from "./routers/product.js";
import addressRouter from "./routers/address.js";
import sliderRouter from "./routers/sliderImage.js";
import categoryRouter from "./routers/category.js";
import orderRouter from "./routers/order.js";
import couponRouter from "./routers/coupon.js";
import colorRouter from "./routers/color.js";
import sizeRouter from "./routers/size.js";
import cors from "cors";
import "dotenv/config";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors({credentials: true, origin:[
  "https://shop-quest-frontend.vercel.app",
  "http://localhost:3000"
]}));

const port = process.env.SERVER_PORT || 4000;

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/slider", sliderRouter);
app.use("/api/category", categoryRouter);
app.use("/api/address", addressRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/size", sizeRouter);
app.use("/api/order", orderRouter);

app.get("/", (req,res) => {
  res.send("hallo")
} )

try {
  mongoose
    .connect(process.env.DB_SECRET)
    .then(console.log("connect to Database"))
    .then(
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      })
    );
} catch (e) {
  console.log(e);
}

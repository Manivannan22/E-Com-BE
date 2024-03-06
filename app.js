import express, { json } from "express";
import cors from "cors";
import connectDb from "./src/utils/dbConnection.js";
import Products from "./src/routes/product.js"
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000
const app = express();
app.use(json());
app.use(cors({ origin: "*" }));
app.use("/api", Products)
connectDb
app.listen(PORT, async () => {
  console.log(`server is running on the port ${PORT}`);
});




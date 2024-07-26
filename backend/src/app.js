import express from "express";
import cors from "cors";
import productRouter from "./routers/transaction.router.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/v1/transactions", productRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
export default app;

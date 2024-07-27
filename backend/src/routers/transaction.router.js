import { Router } from "express";
import {
    getBarChartData,
  getStats,
  getTransactions,
  initDb,
} from "../controllers/transaction.controller.js";

const transactionRouter = Router();

transactionRouter.route("/").post(initDb).get(getTransactions);

transactionRouter.route("/stats").get(getStats);
transactionRouter.route("/barChart").get(getBarChartData);

export default transactionRouter;

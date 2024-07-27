import { Router } from "express";
import {
    getBarChartData,
  getPieChartData,
  getStats,
  getTransactions,
  initDb,
} from "../controllers/transaction.controller.js";

const transactionRouter = Router();

transactionRouter.route("/").post(initDb).get(getTransactions);

transactionRouter.route("/stats").get(getStats);
transactionRouter.route("/barchart").get(getBarChartData);
transactionRouter.route("/piechart").get(getPieChartData);

export default transactionRouter;

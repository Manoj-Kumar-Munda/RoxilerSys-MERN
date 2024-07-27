import { Router } from "express";
import {
  getAllData,
  getBarChartData,
  getPieChartData,
  getSales,
  getTransactions,
  initDb,
} from "../controllers/transaction.controller.js";

const transactionRouter = Router();

transactionRouter.route("/").post(initDb).get(getTransactions);

transactionRouter.route("/sales").get(getSales);
transactionRouter.route("/barchart").get(getBarChartData);
transactionRouter.route("/piechart").get(getPieChartData);
transactionRouter.route("/stats").get(getAllData);

export default transactionRouter;

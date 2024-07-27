import { Router } from "express";
import {
  getStats,
  getTransactions,
  initDb,
} from "../controllers/transaction.controller.js";

const transactionRouter = Router();

transactionRouter.route("/").post(initDb).get(getTransactions);

transactionRouter.route("/stats").get(getStats);
export default transactionRouter;

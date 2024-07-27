import { Router } from "express";
import { getTransactions, initDb } from "../controllers/transaction.controller.js";

const transactionRouter = Router();

transactionRouter.route("/")
    .post(initDb)
    .get(getTransactions);

export default transactionRouter;

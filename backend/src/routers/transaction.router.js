import { Router } from "express";
import { initDb } from "../controllers/transaction.controller.js";

const transactionRouter = Router();

transactionRouter.route("/").post(initDb);

export default transactionRouter;

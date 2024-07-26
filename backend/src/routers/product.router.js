import { Router } from "express";
import { initDb } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.route("/").post(initDb);

export default productRouter;

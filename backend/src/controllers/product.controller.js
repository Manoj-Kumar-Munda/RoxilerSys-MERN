import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const fetchProducts = async () => {
  const data = await fetch(
    "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
  ).then((data) => data.json());
  return data;
};

const initDb = async (req, res, next) => {
  try {
    let products = await Product.find();
    if (products.length === 0) {
      const data = await fetchProducts();
      if (!data) {
        throw new ApiError(500, "Internal server error");
      }
      products = await Product.insertMany(data);
    }

    if (products.length === 0) {
      throw new ApiError(500, "Internal server error");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, products, "data added to db"));
  } catch (error) {
    next(error);
  }
};

export { initDb };

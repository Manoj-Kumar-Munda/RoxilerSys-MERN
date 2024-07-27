import { Transaction } from "../models/transaction.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const fetchTransactions = async () => {
  const data = await fetch(
    "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
  ).then((data) => data.json());
  return data;
};

const initDb = async (req, res, next) => {
  try {
    let transactions = await Transaction.find();
    if (transactions.length === 0) {
      const data = await fetchTransactions();
      if (!data) {
        throw new ApiError(500, "Internal server error");
      }
      transactions = await Transaction.insertMany(data);
    }
    if (transactions.length === 0) {
      throw new ApiError(500, "Internal server error");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, transactions, "data added to db"));
  } catch (error) {
    next(error);
  }
};

const getTransactions = async (req, res, next) => {
  const { searchText = "" } = req.query;
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;

  const offset = (page - 1) * limit;
  let transactions;
  try {
    if (!searchText) {
      transactions = await Transaction.find().skip(offset).limit(limit);

      if (transactions.length === 0) {
        throw new ApiError(404, "No data available");
      } else {
        return res.status(200).json(new ApiResponse(200, transactions));
      }
    }

    transactions = await Transaction.find({ $text: { $search: searchText } })
      .skip(offset)
      .limit(limit);

    if (transactions.length === 0) {
      throw new ApiError(404, "No data available");
    }

    return res.status(200).json(new ApiResponse(200, transactions));
  } catch (error) {
    next(error);
  }
};

export { initDb, getTransactions };

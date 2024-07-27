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
  const month = parseInt(req.query.month);
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;

  const offset = (page - 1) * limit;
  let transactions;
  try {
    if (!month) {
      throw new ApiError(400, "Month is required");
    }
    if (!searchText) {
      transactions = await Transaction.aggregate([
        {
          $match: {
            $expr: {
              $eq: [{ $month: "$dateOfSale" }, 1],
            },
          },
        },
        {
          $skip: offset,
        },
        {
          $limit: limit,
        },
      ]);

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

const getSales = async (req, res, next) => {
  const month = parseInt(req.query?.month);
  try {
    if (!month) {
      throw new ApiError(400, "Month is required");
    }
    const totalSale = await Transaction.aggregate([
      {
        $match: {
          $and: [
            { sold: true },
            {
              $expr: {
                $eq: [{ $month: "$dateOfSale" }, month],
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: null,
          totalSale: {
            $sum: "$price",
          },
        },
      },
    ]);

    const totalSoldItems = await Transaction.aggregate([
      {
        $match: {
          sold: true,
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, month],
          },
        },
      },
      {
        $count: "totalSoldItems",
      },
    ]);

    const totalUnsoldItems = await Transaction.aggregate([
      {
        $match: {
          sold: false,
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, month],
          },
        },
      },
      {
        $count: "totalUnsoldItems",
      },
    ]);

    return res.status(200).json(
      new ApiResponse(200, {
        totalSaleAmt: totalSale[0].totalSale.toFixed(2),
        totalSoldItems: totalSoldItems[0].totalSoldItems,
        totalUnsoldItems: totalUnsoldItems[0].totalUnsoldItems,
      })
    );
  } catch (error) {
    next(error);
  }
};

const getBarChartData = async (req, res, next) => {
  const month = parseInt(req.query?.month);

  try {
    if (!month) {
      throw new ApiError(400, "Month is required");
    }
    const data = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, month],
          },
        },
      },
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900],
          default: "Others",
          output: {
            count: { $sum: 1 },
          },
        },
      },
    ]);

    return res
      .status(200)
      .json(new ApiResponse(200, data, "data fetched successfully"));
  } catch (error) {
    next(error);
  }
};

const getPieChartData = async (req, res, next) => {
  const month = parseInt(req.query?.month);
  try {
    if (!month) {
      throw new ApiError(400, "Month is required");
    }
    const data = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, month],
          },
        },
      },
      {
        $group: {
          _id: "$category",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    console.log("data: ", data);

    return res
      .status(200)
      .json(new ApiResponse(200, data, "data fetched successfully"));
  } catch (error) {
    next(error);
  }
};

const getAllData = async (req, res, next) => {
  const month = req.query?.month;
  try {
    if (!month) {
      throw new ApiError(400, "Month is required");
    }
    const { data: sales } = await fetch(
      `http://localhost:8000/api/v1/transactions/sales?month=${month}`
    ).then((data) => data.json());

    const { data: barchartData } = await fetch(
      `http://localhost:8000/api/v1/transactions/barchart?month=${month}`
    ).then((data) => data.json());

    const { data: piechartData } = await fetch(
      `http://localhost:8000/api/v1/transactions/piechart?month=${month}`
    ).then((data) => data.json());

    return res.status(200).json(
      new ApiResponse(200, {
        sales,
        barchartData,
        piechartData,
      })
    );
  } catch (error) {
    next(error);
  }
};

export {
  initDb,
  getTransactions,
  getSales,
  getBarChartData,
  getPieChartData,
  getAllData,
};

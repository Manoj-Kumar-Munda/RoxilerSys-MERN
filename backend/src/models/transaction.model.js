import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
    index: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  sold: {
    type: Boolean,
    required: true,
  },
  dateOfSale: {
    type: Date,
    required: true,
  },
});

export const Transaction = mongoose.model("Transaction", transactionSchema);

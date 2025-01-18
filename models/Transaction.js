const mongoose = require('mongoose');  // Ensure mongoose is imported

const transactionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  barnType: { type: String, default: "" },  // Barn Type for Barnee Karra Tobacco
  numberOfKarra: { type: Number, default: 0 },  // Number of Karra for Barnee Karra Tobacco
});

// Create the Transaction model
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;

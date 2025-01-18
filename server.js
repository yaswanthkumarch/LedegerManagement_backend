const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize the Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json()); // To parse JSON request bodies

// MongoDB connection URI
const mongoURI = "mongodb+srv://yash:yaSH%40123@ledegermanagement.miem6.mongodb.net/?retryWrites=true&w=majority&appName=Ledegermanagement";

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

// Define the Transaction model
const Transaction = require('./models/transaction.js'); // Assuming it's in a models directory

// POST route to add a new transaction
app.post("/api/add-transaction", async (req, res) => {
  const newTransaction = new Transaction(req.body);

  try {
    const savedTransaction = await newTransaction.save();
    res.status(200).json({ message: "Transaction added successfully", data: savedTransaction });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ message: "Error adding transaction. Please try again." });
  }
});

// GET route to fetch all transactions
app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find(); // Fetch all transactions
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Error fetching transactions. Please try again." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

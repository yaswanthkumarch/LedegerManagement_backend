// Load environment variables from the .env file
require('dotenv').config();

// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize the Express app
const app = express();
const port = process.env.PORT || 5000; // Use the PORT from the .env file or fallback to 5000

// Middleware setup
const allowedOrigins = [
  "http://localhost:3000", // For local development
  "https://ledegermanagement-frontend.onrender.com", // For frontend on Render
  "https://transaction-management-puce.vercel.app", 
  "https://transaction-management-mdbm.onrender.com",
  "https://transaction-management-hx54eeig8-yaswanthkumarchs-projects.vercel.app",
  "https://ledeger-management-frontend-a8lsnx7ko-yaswanthkumarchs-projects.vercel.app", // For frontend on Vercel
];

// CORS configuration to allow multiple origins
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      // Allow requests from allowed origins
      callback(null, true);
    } else {
      // Reject requests from other origins
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST'], // Allow only GET and POST methods
  credentials: true, // Allow credentials like cookies to be sent
}));

app.use(bodyParser.json()); // To parse JSON request bodies

// MongoDB connection URI from the .env file
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

// Define the Transaction model (models/transaction.js)
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
const Transaction = mongoose.model("Transaction_26", transactionSchema);

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

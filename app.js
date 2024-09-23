const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Middleware to parse JSON
app.use(express.json());

// Set the build path for serving static files from the frontend
const buildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildPath));

// CORS configuration
app.use(
  cors({
    origin: 'https://hardware-heaven-app1.vercel.app', // Allow your frontend origin
    methods: ["POST", "GET"], // Allowed methods
    credentials: true, // Allow credentials (cookies)
  })
);

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for URL-encoded data
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");
const withdraw = require("./controller/withdraw");

// Define API routes
app.use("/api/v2/user", user);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/order", order);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/withdraw", withdraw);

// Health check route for testing
app.use("/test", (req, res) => {
  res.send("Hello world from app.js!");
});

// Error handling middleware
app.use(ErrorHandler);

// Environment variables setup
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

module.exports = app;

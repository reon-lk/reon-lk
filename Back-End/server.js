const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const nodeBase64 = require('nodejs-base64-converter');

const app = express();
dotenv.config();

app.use(cookieParser());
app.use(express.json());

const port = 3000;

// Connect with MongoDB
const connectDB = require("./config/db");
connectDB();


// Routes
const userRoutes = require("./routes/userRoutes");

app.use("/", userRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ` + port);
})
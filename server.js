//server.js
const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const cors = require('cors');

connectDb();
const app = express();

const port = process.env.PORT || 5000;

// Allow requests from all origins
app.use(cors());

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/files", require("./routes/fileRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
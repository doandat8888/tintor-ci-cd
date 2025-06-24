const express = require("express");
const app = express();
const createError = require("http-errors");
const route = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const db = require("./helpers/connection_mongodb");

db.connect();

app.get("/", (req, res, next) => {
  res.send("CLV Hackathon 2024");
});

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Use router
app.use("/api/v1", route);

app.use((req, res, next) => {
  next(createError.NotFound("Route doesn't exist"));
});

app.use((err, req, res, next) => {
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});


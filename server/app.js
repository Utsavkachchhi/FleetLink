const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api", routes);

// global error handler
app.use(errorHandler);

module.exports = app;

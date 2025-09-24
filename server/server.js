require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/connection");
const config = require("./config");

(async () => {
  try {
    await connectDB();
    const server = app.listen(config.port, () => {
      console.log(`🚀 Server running in ${config.nodeEnv} on port ${config.port}`);
    });

    // graceful shutdown handlers
    process.on("unhandledRejection", (err) => {
      console.error("Unhandled Rejection", err);
      server.close(() => process.exit(1));
    });

    process.on("SIGTERM", () => {
      console.log("SIGTERM received. Shutting down.");
      server.close(() => process.exit(0));
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();

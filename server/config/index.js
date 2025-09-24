
const getConfig = () => {
  const env = process.env.NODE_ENV || "development";

  const baseConfig = {
    port: 5000,
    mongoURI: "mongodb://localhost:27017/fleetlink",
    nodeEnv: env,
  };

  const envConfig = {
    port: process.env.PORT ? Number(process.env.PORT) : baseConfig.port,
    mongoURI: process.env.MONGO_URI || baseConfig.mongoURI,
  };

  return {
    ...baseConfig,
    ...envConfig,
  };
};

module.exports = getConfig();

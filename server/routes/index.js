const express = require("express");
const router = express.Router();

router.use("/vehicles", require("./vehicleRoutes"));
router.use("/bookings", require("./bookingRoutes"));

module.exports = router;

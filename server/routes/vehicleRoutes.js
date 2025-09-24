const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");
const validateVehicle = require("../validators/vehicleValidator");
const { validateBooking, validateAvailableQuery } = require("../validators/bookingValidator");
const validateRequest = require("../middlewares/validateRequest");

router.post("/", validateVehicle, validateRequest, vehicleController.addVehicle);

router.get("/available",validateAvailableQuery, validateRequest, vehicleController.getAvailableVehicles);

module.exports = router;


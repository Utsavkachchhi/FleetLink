const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { validateBooking } = require("../validators/bookingValidator");
const validateRequest = require("../middlewares/validateRequest");

// POST /api/bookings
router.post("/", validateBooking, validateRequest, bookingController.createBooking);
router.get("/", bookingController.getAllBookings);
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;

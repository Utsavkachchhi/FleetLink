const asyncHandler = require("../middlewares/asyncHandler");
const { successResponse } = require("../utils/response");
const bookingService = require("../services/bookingService");

const createBooking = asyncHandler(async (req, res) => {
  const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;

  const booking = await bookingService.createBooking({
    vehicleId,
    fromPincode,
    toPincode,
    startTimeISO: startTime,
    customerId,
  });

  return successResponse(res, "Booking created", booking, 201);
});

const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await bookingService.deleteBooking(id);
  return successResponse(res, "Booking deleted successfully");
});

const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await bookingService.getAllBookings();
  return successResponse(res, "Bookings fetched successfully", bookings);
});

module.exports = {
  createBooking,
  deleteBooking,
  getAllBookings
};


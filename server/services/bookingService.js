const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");

function computeEstimatedDuration(fromPincode, toPincode) {
  const a = parseInt(fromPincode, 10);
  const b = parseInt(toPincode, 10);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error("Pincodes must be numeric strings");
  }
  return Math.abs(a - b) % 24;
}


exports.createBooking = async ({ vehicleId, fromPincode, toPincode, startTimeISO, customerId }) => {
  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) {
    const err = new Error("Vehicle not found");
    err.statusCode = 404;
    throw err;
  }

  const estimatedRideDurationHours = computeEstimatedDuration(fromPincode, toPincode);
  const startTime = new Date(startTimeISO);
  if (isNaN(startTime.getTime())) {
    const err = new Error("Invalid startTime");
    err.statusCode = 400;
    throw err;
  }
  const endTime = new Date(startTime.getTime() + estimatedRideDurationHours * 60 * 60 * 1000);

  const conflict = await Booking.exists({
    vehicle: vehicleId,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
  });

  if (conflict) {
    const err = new Error("Vehicle already booked for the requested time");
    err.statusCode = 409;
    throw err;
  }

  const booking = await Booking.create({
    vehicle: vehicleId,
    fromPincode,
    toPincode,
    startTime,
    endTime,
    estimatedRideDurationHours,
    customerId,
  });

  return booking;
};

exports.deleteBooking = async (id) => {
  const booking = await Booking.findById(id);
  if (!booking) {
    const error = new Error("Booking not found");
    error.statusCode = 404;
    throw error;
  }
  await booking.deleteOne();
  return true;
};

exports.getAllBookings = async () => {
  return await Booking.find().populate("vehicle");
};
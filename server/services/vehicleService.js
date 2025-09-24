const Vehicle = require("../models/Vehicle");
const Booking = require("../models/Booking");


function computeEstimatedDuration(fromPincode, toPincode) {
  const a = parseInt(fromPincode, 10);
  const b = parseInt(toPincode, 10);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error("Pincodes must be numeric strings");
  }
  return Math.abs(a - b) % 24;
}

exports.createVehicle = (payload) => Vehicle.create(payload);


exports.findAvailableVehicles = async ({ capacityRequired, fromPincode, toPincode, startTimeISO }) => {

  const estimatedRideDurationHours = computeEstimatedDuration(fromPincode, toPincode);
  const startTime = new Date(startTimeISO);
  if (isNaN(startTime.getTime())) throw new Error("Invalid startTime");
  const endTime = new Date(startTime.getTime() + estimatedRideDurationHours * 60 * 60 * 1000);

  const candidates = await Vehicle.find({ capacityKg: { $gte: capacityRequired } }).lean();

  const available = [];
  for (const v of candidates) {
    const hasOverlap = await Booking.exists({
      vehicle: v._id,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    });
    if (!hasOverlap) {
      available.push(v);
    }
  }

  return { estimatedRideDurationHours, vehicles: available };
};

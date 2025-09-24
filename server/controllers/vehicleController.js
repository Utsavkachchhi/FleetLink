const asyncHandler = require("../middlewares/asyncHandler");
const { successResponse } = require("../utils/response");
const vehicleService = require("../services/vehicleService");

  const addVehicle = asyncHandler(async (req, res) => {
  const payload = req.body;
  const vehicle = await vehicleService.createVehicle(payload);
  return successResponse(res, "Vehicle created", vehicle, 201);
});

 const getAvailableVehicles = asyncHandler(async (req, res) => {
  const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

  const result = await vehicleService.findAvailableVehicles({
    capacityRequired: Number(capacityRequired),
    fromPincode,
    toPincode,
    startTimeISO: startTime,
  });

  return successResponse(res, "Available vehicles fetched", result);
});

module.exports = {
  addVehicle,
  getAvailableVehicles,
};
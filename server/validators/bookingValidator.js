const { body, query } = require("express-validator");

const validateBooking = [
  body("vehicleId").notEmpty().withMessage("vehicleId is required").isMongoId().withMessage("Invalid vehicleId"),
  body("fromPincode")
    .notEmpty()
    .withMessage("fromPincode is required")
    .matches(/^\d+$/)
    .withMessage("fromPincode must be digits"),
  body("toPincode")
    .notEmpty()
    .withMessage("toPincode is required")
    .matches(/^\d+$/)
    .withMessage("toPincode must be digits"),
  body("startTime")
    .notEmpty()
    .withMessage("startTime is required")
    .isISO8601()
    .withMessage("startTime must be an ISO8601 date/time string"),
  body("customerId").notEmpty().withMessage("customerId is required"),
];

const validateAvailableQuery = [
  query("capacityRequired")
    .notEmpty()
    .withMessage("capacityRequired is required")
    .isFloat({ min: 0 })
    .withMessage("capacityRequired must be a non-negative number"),
  query("fromPincode")
    .notEmpty()
    .withMessage("fromPincode is required")
    .matches(/^\d+$/)
    .withMessage("fromPincode must be digits"),
  query("toPincode")
    .notEmpty()
    .withMessage("toPincode is required")
    .matches(/^\d+$/)
    .withMessage("toPincode must be digits"),
  query("startTime").notEmpty().withMessage("startTime is required").isISO8601().withMessage("startTime must be ISO8601"),
];

module.exports = {
  validateBooking,
  validateAvailableQuery,
};

const { body } = require("express-validator");

const validateVehicle = [
  body("name").notEmpty().withMessage("Vehicle name is required").isString().withMessage("Name must be a string"),
  body("capacityKg")
    .notEmpty()
    .withMessage("capacityKg is required")
    .isFloat({ min: 0 })
    .withMessage("capacityKg must be a non-negative number"),
  body("tyres")
    .notEmpty()
    .withMessage("tyres is required")
    .isInt({ min: 1 })
    .withMessage("tyres must be an integer >= 1"),
];

module.exports = validateVehicle;

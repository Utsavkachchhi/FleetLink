
import * as yup from "yup";

const addVehicleSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Vehicle name is required")
    .max(100, "Name cannot exceed 100 characters"),
  capacityKg: yup
    .number()
    .typeError("Capacity must be a number")
    .required("Capacity is required")
    .min(1, "Capacity must be at least 1 Kg")
    .max(100000, "Capacity cannot exceed 100000 Kg"),
  tyres: yup
    .number()
    .typeError("Tyres must be a number")
    .required("Number of tyres is required")
    .min(2, "Vehicle must have at least 2 tyres")
    .max(20, "Vehicle cannot have more than 20 tyres"),
});

const bookVehicleschema = yup.object().shape({
  capacityRequired: yup
    .number()
    .typeError("Capacity must be a number")
    .required("Capacity is required")
    .min(1, "Must be at least 1 Kg"),
  fromPincode: yup
    .string()
    .required("From Pincode is required")
    .matches(/^\d{6}$/, "Must be a valid 6-digit pincode"),
  toPincode: yup
    .string()
    .required("To Pincode is required")
    .matches(/^\d{6}$/, "Must be a valid 6-digit pincode"),
  startTime: yup.string().required("Start Time is required"),
});

export { addVehicleSchema,bookVehicleschema };
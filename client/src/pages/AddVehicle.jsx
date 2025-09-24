import { ArrowLeft, Plus, Settings, Truck, Weight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Header from "../components/Header";
import { addVehicleSchema } from "../schemaValidation/vehicleSchema";
import { addVehicle } from "../api/service";



const AddVehicle = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(addVehicleSchema),
    defaultValues: {
      name: "",
      capacityKg: "",
      tyres: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name.trim(),
        capacityKg: Number(data.capacityKg),
        tyres: Number(data.tyres),
      };

      const response = await addVehicle(payload);

      toast.success(response.data.message || "Vehicle Added Successfully!");

      reset();
      navigate("/search")
    } catch (error) {
      console.error("Add vehicle error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Unable to add vehicle. Please try again.";
      toast.error(errorMessage);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Add Vehicle Form */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
              <Plus className="h-5 w-5 text-blue-600" />
              Add New Vehicle
            </h2>
            <p className="text-gray-500 mb-6">
              Add a new vehicle to your fleet for bookings.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Vehicle Name */}
              <div>
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 font-medium text-gray-700"
                >
                  <Truck className="h-4 w-4" />
                  Vehicle Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g., Truck A, Mini Van 1, Heavy Loader"
                  {...register("name")}
                  className="mt-1 block w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Capacity */}
              <div>
                <label
                  htmlFor="capacityKg"
                  className="flex items-center gap-2 font-medium text-gray-700"
                >
                  <Weight className="h-4 w-4" />
                  Capacity (Kg)
                </label>
                <input
                  id="capacityKg"
                  type="number"
                  placeholder="e.g., 3000"
                  {...register("capacityKg")}
                  className="mt-1 block w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Maximum weight capacity in kilograms
                </p>
                {errors.capacityKg && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.capacityKg.message}
                  </p>
                )}
              </div>

              {/* Tyres */}
              <div>
                <label
                  htmlFor="tyres"
                  className="flex items-center gap-2 font-medium text-gray-700"
                >
                  <Settings className="h-4 w-4" />
                  Number of Tyres
                </label>
                <input
                  id="tyres"
                  type="number"
                  placeholder="e.g., 6"
                  {...register("tyres")}
                  className="mt-1 block w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Total number of tyres on the vehicle
                </p>
                {errors.tyres && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.tyres.message}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded bg-blue-600 text-white py-2 hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Adding Vehicle..." : "Add Vehicle"}
                </button>

                <Link to="/" className="flex-1">
                  <button
                    type="button"
                    className="w-full rounded border py-2 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;

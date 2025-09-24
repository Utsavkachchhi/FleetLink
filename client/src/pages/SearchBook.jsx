import { Calendar, MapPin, Plus, Search, Truck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import VehicleCard from "../components/VehicleCard";
import { toast } from "react-toastify";
import Header from "../components/Header";
import { bookVehicleschema } from "../schemaValidation/vehicleSchema";
import { createBooking, fetchAvailableVehicles } from "../api/service";



const SearchBook = () => {
  const [vehicles, setVehicles] = useState([]);
  const [bookingVehicleId, setBookingVehicleId] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(bookVehicleschema),
    defaultValues: {
      capacityRequired: "",
      fromPincode: "",
      toPincode: "",
      startTime: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const searchParams = {
        capacityRequired: parseInt(data.capacityRequired),
        fromPincode: data.fromPincode,
        toPincode: data.toPincode,
        startTime: new Date(data.startTime).toISOString(),
      };

      const response = await fetchAvailableVehicles(searchParams);

      const availableVehicles = response.data.data.vehicles.map((v) => ({
        ...v,
        estimatedRideDurationHours:
          response.data.data.estimatedRideDurationHours,
        id: v._id,
      }));

      setVehicles(availableVehicles);

      toast.success(response.data.message || "Search Complete");
    } catch (error) {
      console.error("Search error:", error);
      toast.error(error.response?.data?.message || "Search Failed");
    }
  };

  const handleBook = async (vehicleId) => {
    setBookingVehicleId(vehicleId);

    try {
      const bookingData = {
        vehicleId,
        fromPincode: watch("fromPincode"),
        toPincode: watch("toPincode"),
        startTime: new Date(watch("startTime")).toISOString(),
        customerId: "demoCustomer123", 
      };

      const response = await createBooking(bookingData);

      toast.success(response.data.message || "Booking Confirmed!");

      setVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
    } catch (error) {
      console.error("Booking error:", error);
       toast.error(error.response?.data?.message || "Booking Failed");
    } finally {
      setBookingVehicleId(null);
    }
  };
  const searchData = watch();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Search className="h-5 w-5 text-blue-600" />
            Search & Book Vehicles
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Capacity */}
              <div>
                <label className="flex items-center gap-2 font-medium text-gray-700">
                  <Truck className="h-4 w-4" />
                  Capacity Required (Kg)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 1000"
                  {...register("capacityRequired")}
                  className={`mt-1 w-full border rounded px-3 py-2 text-sm ${
                    errors.capacityRequired ? "border-red-500" : ""
                  }`}
                />
                {errors.capacityRequired && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.capacityRequired.message}
                  </p>
                )}
              </div>

              {/* From Pincode */}
              <div>
                <label className="flex items-center gap-2 font-medium text-gray-700">
                  <MapPin className="h-4 w-4" />
                  From Pincode
                </label>
                <input
                  type="text"
                  placeholder="e.g., 400001"
                  {...register("fromPincode")}
                  className={`mt-1 w-full border rounded px-3 py-2 text-sm ${
                    errors.fromPincode ? "border-red-500" : ""
                  }`}
                />
                {errors.fromPincode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fromPincode.message}
                  </p>
                )}
              </div>

              {/* To Pincode */}
              <div>
                <label className="flex items-center gap-2 font-medium text-gray-700">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  To Pincode
                </label>
                <input
                  type="text"
                  placeholder="e.g., 400002"
                  {...register("toPincode")}
                  className={`mt-1 w-full border rounded px-3 py-2 text-sm ${
                    errors.toPincode ? "border-red-500" : ""
                  }`}
                />
                {errors.toPincode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.toPincode.message}
                  </p>
                )}
              </div>

              {/* Start Time */}
              <div>
                <label className="flex items-center gap-2 font-medium text-gray-700">
                  <Calendar className="h-4 w-4" />
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  {...register("startTime")}
                  className={`mt-1 w-full border rounded px-3 py-2 text-sm ${
                    errors.startTime ? "border-red-500" : ""
                  }`}
                />
                {errors.startTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startTime.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Searching..." : "Search Vehicles"}
            </button>
          </form>
        </div>

        {/* Results */}
        {vehicles.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Available Vehicles
              </h2>
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                {vehicles.length} found
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onBook={handleBook}
                  isBooking={bookingVehicleId === vehicle.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isSubmitting &&
          vehicles.length === 0 &&
          searchData.capacityRequired && (
            <div className="bg-white rounded-lg shadow text-center py-12">
              <Truck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No Vehicles Found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria or check back later.
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default SearchBook;

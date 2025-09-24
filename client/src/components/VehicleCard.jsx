import React from "react";
import { Truck, Clock, Weight } from "lucide-react";

const VehicleCard = ({ vehicle, onBook, isBooking = false }) => {
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md p-4 flex flex-col justify-between">
      {/* Header */}
      <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
        <Truck className="h-5 w-5 text-blue-600" />
        {vehicle.name}
      </h3>

      {/* Info */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Weight className="h-4 w-4" />
          <span className="text-sm">
            {vehicle.capacityKg.toLocaleString()} Kg
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="h-4 w-4" />
          <span className="text-sm">{vehicle.estimatedRideDurationHours}h</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
          {vehicle.tyres} Tyres
        </span>
        <button
          onClick={() => onBook(vehicle.id)}
          disabled={isBooking}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isBooking ? "Booking..." : "Book Now"}
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;

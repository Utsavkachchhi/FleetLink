import React, { useEffect, useState } from "react";
import { Trash, Truck } from "lucide-react";
import { toast } from "react-toastify";
import Header from "../components/Header";
import { deleteBooking, getBookings } from "../api/service";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await getBookings();
      const data = response.data.data.map((b) => ({
        ...b,
        id: b._id,
      }));
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error(error.response?.data?.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  // Delete booking
  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    setDeletingId(bookingId);
    try {
      await deleteBooking(bookingId);
      toast.success("Booking deleted successfully");
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error(error.response?.data?.message || "Failed to delete booking");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">All Bookings</h2>

        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">Vehicle Name</th>
                  <th className="border px-4 py-2">Capacity</th>
                  <th className="border px-4 py-2">Tyres</th>
                  <th className="border px-4 py-2">From</th>
                  <th className="border px-4 py-2">To</th>
                  <th className="border px-4 py-2">Start Time</th>
                  <th className="border px-4 py-2">End Time</th>
                  <th className="border px-4 py-2">Duration (hrs)</th>
                  <th className="border px-4 py-2">Customer ID</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{b.vehicle.name}</td>
                    <td className="border px-4 py-2">{b.vehicle.capacityKg}</td>
                    <td className="border px-4 py-2">{b.vehicle.tyres}</td>
                    <td className="border px-4 py-2">{b.fromPincode}</td>
                    <td className="border px-4 py-2">{b.toPincode}</td>
                    <td className="border px-4 py-2">
                      {new Date(b.startTime).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(b.endTime).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">
                      {b.estimatedRideDurationHours}
                    </td>
                    <td className="border px-4 py-2">{b.customerId}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        className="text-red-600 hover:text-red-800 flex items-center gap-1 justify-center"
                        onClick={() => handleDelete(b.id)}
                        disabled={deletingId === b.id}
                      >
                        <Trash className="h-4 w-4" />
                        {deletingId === b.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBookings;

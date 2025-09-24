import api from "./axios";



 const fetchAvailableVehicles = async (searchParams) => {
  try {
    const response = await api.get("/vehicles/available", {
      params: searchParams,
    });
    return response;
  } catch (error) {
    console.error("Error fetching available vehicles:", error);
    throw error; 
  }
};

 const addVehicle = async (payload) => {
  try {
    const response = await api.post("/vehicles", payload);
    return response;
  } catch (error) {
    throw error;
  }
};

 const createBooking = async (bookingData) => {
  try {
    const response = await api.post("/bookings", bookingData);
    return response;
  } catch (error) {
    throw error;
  }
};

const getBookings = async () => {
  try {
    const response = await api.get("/bookings");
    return response;
  } catch (error) {
    throw error;
  }
};

const deleteBooking = async (bookingId) => {
  try {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export { fetchAvailableVehicles, addVehicle,createBooking,getBookings, deleteBooking };
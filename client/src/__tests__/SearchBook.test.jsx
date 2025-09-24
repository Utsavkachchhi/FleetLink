import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBook from "../pages/SearchBook";
import { fetchAvailableVehicles, createBooking } from "../api/service";
import { toast } from "react-toastify";

// Mock the API and toast
jest.mock("../api/service", () => ({
  fetchAvailableVehicles: jest.fn(),
  createBooking: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("SearchBook Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders search form correctly", () => {
    render(<SearchBook />);

    expect(screen.getByText(/Search & Book Vehicles/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Capacity Required/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/From Pincode/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/To Pincode/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Time/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Search Vehicles/i })).toBeInTheDocument();
  });

  test("shows validation errors when submitting empty form", async () => {
    render(<SearchBook />);

    fireEvent.click(screen.getByRole("button", { name: /Search Vehicles/i }));

    await waitFor(() => {
      expect(screen.getByText(/Capacity Required/i)).toBeInTheDocument();
      expect(screen.getByText(/From Pincode/i)).toBeInTheDocument();
      expect(screen.getByText(/To Pincode/i)).toBeInTheDocument();
      expect(screen.getByText(/Start Time/i)).toBeInTheDocument();
    });
  });

  test("displays available vehicles on successful search", async () => {
    fetchAvailableVehicles.mockResolvedValueOnce({
      data: {
        message: "Vehicles found",
        data: {
          estimatedRideDurationHours: 3,
          vehicles: [
            { _id: "1", name: "Truck A", capacity: 1000 },
            { _id: "2", name: "Truck B", capacity: 2000 },
          ],
        },
      },
    });

    render(<SearchBook />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/Capacity Required/i), {
      target: { value: "500" },
    });
    fireEvent.change(screen.getByLabelText(/From Pincode/i), {
      target: { value: "400001" },
    });
    fireEvent.change(screen.getByLabelText(/To Pincode/i), {
      target: { value: "400002" },
    });
    fireEvent.change(screen.getByLabelText(/Start Time/i), {
      target: { value: "2025-09-24T10:00" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Search Vehicles/i }));

    // Wait for results
    await waitFor(() => {
      expect(fetchAvailableVehicles).toHaveBeenCalled();
      expect(screen.getByText(/Available Vehicles/i)).toBeInTheDocument();
      expect(screen.getByText("Truck A")).toBeInTheDocument();
      expect(screen.getByText("Truck B")).toBeInTheDocument();
    });

    expect(toast.success).toHaveBeenCalledWith("Vehicles found");
  });

  test("books a vehicle successfully", async () => {
    // Mock search response
    fetchAvailableVehicles.mockResolvedValueOnce({
      data: {
        message: "Vehicles found",
        data: {
          estimatedRideDurationHours: 3,
          vehicles: [{ _id: "1", name: "Truck A", capacity: 1000 }],
        },
      },
    });

    // Mock booking response
    createBooking.mockResolvedValueOnce({
      data: { message: "Booking Confirmed!" },
    });

    render(<SearchBook />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/Capacity Required/i), {
      target: { value: "500" },
    });
    fireEvent.change(screen.getByLabelText(/From Pincode/i), {
      target: { value: "400001" },
    });
    fireEvent.change(screen.getByLabelText(/To Pincode/i), {
      target: { value: "400002" },
    });
    fireEvent.change(screen.getByLabelText(/Start Time/i), {
      target: { value: "2025-09-24T10:00" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Search Vehicles/i }));

    // Wait for vehicles
    await waitFor(() => {
      expect(screen.getByText("Truck A")).toBeInTheDocument();
    });

    // Book the vehicle
    fireEvent.click(screen.getByRole("button", { name: /Book/i }));

    await waitFor(() => {
      expect(createBooking).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Booking Confirmed!");
    });

    // Vehicle should disappear after booking
    expect(screen.queryByText("Truck A")).not.toBeInTheDocument();
  });
});

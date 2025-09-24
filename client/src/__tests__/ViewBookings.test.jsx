import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ViewBookings from "../pages/ViewBookings";
import { getBookings, deleteBooking } from "../api/service";
import { toast } from "react-toastify";

// Mock services and toast
jest.mock("../api/service", () => ({
  getBookings: jest.fn(),
  deleteBooking: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock confirm dialog globally
beforeAll(() => {
  global.confirm = jest.fn();
});

describe("ViewBookings Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading and then renders bookings table", async () => {
    getBookings.mockResolvedValueOnce({
      data: {
        data: [
          {
            _id: "1",
            vehicle: { name: "Truck A", capacityKg: 1000, tyres: 6 },
            fromPincode: "400001",
            toPincode: "400002",
            startTime: "2025-09-24T10:00:00Z",
            endTime: "2025-09-24T12:00:00Z",
            estimatedRideDurationHours: 2,
            customerId: "cust123",
          },
        ],
      },
    });

    render(<ViewBookings />);

    // Loading state
    expect(screen.getByText(/Loading bookings/i)).toBeInTheDocument();

    // Wait for data
    await waitFor(() => {
      expect(getBookings).toHaveBeenCalled();
      expect(screen.getByText("Truck A")).toBeInTheDocument();
      expect(screen.getByText("1000")).toBeInTheDocument();
      expect(screen.getByText("cust123")).toBeInTheDocument();
    });
  });

  test("shows 'No bookings found' when API returns empty", async () => {
    getBookings.mockResolvedValueOnce({ data: { data: [] } });

    render(<ViewBookings />);

    await waitFor(() => {
      expect(screen.getByText(/No bookings found/i)).toBeInTheDocument();
    });
  });

  test("shows error toast when fetching fails", async () => {
    getBookings.mockRejectedValueOnce({
      response: { data: { message: "Fetch failed" } },
    });

    render(<ViewBookings />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Fetch failed");
    });
  });

  test("deletes a booking successfully", async () => {
    getBookings.mockResolvedValueOnce({
      data: {
        data: [
          {
            _id: "1",
            vehicle: { name: "Truck A", capacityKg: 1000, tyres: 6 },
            fromPincode: "400001",
            toPincode: "400002",
            startTime: "2025-09-24T10:00:00Z",
            endTime: "2025-09-24T12:00:00Z",
            estimatedRideDurationHours: 2,
            customerId: "cust123",
          },
        ],
      },
    });

    deleteBooking.mockResolvedValueOnce({});

    global.confirm.mockReturnValue(true);

    render(<ViewBookings />);

    // Wait for data
    await waitFor(() => {
      expect(screen.getByText("Truck A")).toBeInTheDocument();
    });

    // Click delete
    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));

    await waitFor(() => {
      expect(deleteBooking).toHaveBeenCalledWith("1");
      expect(toast.success).toHaveBeenCalledWith("Booking deleted successfully");
      expect(screen.queryByText("Truck A")).not.toBeInTheDocument();
    });
  });

  test("shows error toast when delete fails", async () => {
    getBookings.mockResolvedValueOnce({
      data: {
        data: [
          {
            _id: "1",
            vehicle: { name: "Truck A", capacityKg: 1000, tyres: 6 },
            fromPincode: "400001",
            toPincode: "400002",
            startTime: "2025-09-24T10:00:00Z",
            endTime: "2025-09-24T12:00:00Z",
            estimatedRideDurationHours: 2,
            customerId: "cust123",
          },
        ],
      },
    });

    deleteBooking.mockRejectedValueOnce({
      response: { data: { message: "Delete failed" } },
    });

    global.confirm.mockReturnValue(true);

    render(<ViewBookings />);

    // Wait for data
    await waitFor(() => {
      expect(screen.getByText("Truck A")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Delete failed");
    });
  });

  test("cancels delete when confirm returns false", async () => {
    getBookings.mockResolvedValueOnce({
      data: {
        data: [
          {
            _id: "1",
            vehicle: { name: "Truck A", capacityKg: 1000, tyres: 6 },
            fromPincode: "400001",
            toPincode: "400002",
            startTime: "2025-09-24T10:00:00Z",
            endTime: "2025-09-24T12:00:00Z",
            estimatedRideDurationHours: 2,
            customerId: "cust123",
          },
        ],
      },
    });

    global.confirm.mockReturnValue(false);

    render(<ViewBookings />);

    await waitFor(() => {
      expect(screen.getByText("Truck A")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));

    expect(deleteBooking).not.toHaveBeenCalled();
  });
});

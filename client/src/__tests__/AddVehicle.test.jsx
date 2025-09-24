import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddVehicle from '../pages/AddVehicle';

describe('AddVehicle Component', () => {
  test('renders the form correctly', () => {
    render(<AddVehicle />);
    expect(screen.getByLabelText(/Vehicle Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Capacity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tyres/i)).toBeInTheDocument();
  });

  test('shows validation errors on submit with empty fields', async () => {
    render(<AddVehicle />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Vehicle name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Capacity is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Number of tyres is required/i)).toBeInTheDocument();
    });
  });

  // Add more tests for form submission success, API mocks, etc.
});

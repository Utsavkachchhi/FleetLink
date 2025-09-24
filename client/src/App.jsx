import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import AddVehicle from "./pages/AddVehicle";
import SearchBook from "./pages/SearchBook";
import NotFound from "./pages/NotFound";
import ViewBookings from "./pages/ViewBookings";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
        transition={Slide}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchBook />} />
          <Route path="/search" element={<SearchBook />} />
          <Route path="/add-vehicle" element={<AddVehicle />} />
          <Route path="/bookings" element={<ViewBookings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { Plus, Search, Truck } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b bg-white sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Truck className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-600">FleetLink</h1>
        </Link>
        <div className="flex gap-4">
          <Link to="/search">
            <button className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-100">
              <Search className="h-4 w-4" />
              Search/Book
            </button>
          </Link>
          <Link to="/add-vehicle">
            <button className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-100">
              <Plus className="h-4 w-4" />
              Add Vehicle
            </button>
          </Link>
          <Link to="/bookings">
            <button className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-100">
              View Bookings
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

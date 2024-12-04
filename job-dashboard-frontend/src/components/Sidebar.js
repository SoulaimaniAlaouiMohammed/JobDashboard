import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Add Job", path: "/add-job" },
    { name: "Job Listings", path: "/job-listings" },
    { name: "Analytics", path: "/analytics" },
  ];  

  return (
    <div className="h-screen w-64 bg-gray-800 text-gray-200 fixed flex flex-col">
      {}
      <div className="p-4 text-xl font-bold text-center bg-gray-900">
        Job Dashboard
      </div>

      {}
      <nav className="mt-4 flex-grow">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`block px-4 py-2 hover:bg-gray-700 ${
              location.pathname === item.path ? "bg-gray-700" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {}
      <div className="p-4 text-center text-sm text-gray-500">
        © 2024 Job Dashboard
      </div>
    </div>
  );
};

export default Sidebar;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import JobListings from "./pages/JobListings";
import Analytics from "./pages/Analytics";
import './App.css'

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow ml-64 p-6 bg-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-job" element={<AddJob />} />
            <Route path="/job-listings" element={<JobListings />} />
            <Route path="/analytics" element={<Analytics />} /> {}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

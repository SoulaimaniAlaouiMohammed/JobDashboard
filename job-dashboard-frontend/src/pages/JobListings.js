import React, { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import { jobService } from "../services/jobService";

const JobListingsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    domain: "",
    location: "",
    type: "",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedJobs = await jobService.getAllJobs();
        setJobs(fetchedJobs);
        setFilteredJobs(fetchedJobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    const filtered = jobs.filter((job) => {
      return (
        (!updatedFilters.domain ||
          (job.domain &&
            job.domain.toLowerCase() === updatedFilters.domain.toLowerCase())) &&
        (!updatedFilters.location ||
          (job.location &&
            job.location.toLowerCase() === updatedFilters.location.toLowerCase())) &&
        (!updatedFilters.type ||
          (job.type &&
            job.type.toLowerCase() === updatedFilters.type.toLowerCase()))
      );
    });

    setFilteredJobs(filtered);
  };

  const clearFilters = () => {
    setFilters({ domain: "", location: "", type: "" });
    setFilteredJobs(jobs);
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading jobs...</div>;
  }

  if (filteredJobs.length === 0) {
    return <div className="text-center py-10 text-gray-600">No job opportunities available.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Job Listings</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          name="domain"
          value={filters.domain}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Domains</option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile Development">Mobile Development</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="DevOps">DevOps</option>
          <option value="Data">Data</option>
          <option value="Cloud Computing">Cloud Computing</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Reseau">Reseau</option>
        </select>

        <select
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Locations</option>
          <option value="Rabat">Rabat</option>
          <option value="Casablanca">Casablanca</option>
          <option value="Marrakech">Marrakech</option>
          <option value="Fes">Fes</option>
          <option value="Agadir">Agadir</option>
          <option value="Tangier">Tangier</option>
          <option value="Meknes">Meknes</option>
          <option value="Sale">Sale</option>
          <option value="Oujda">Oujda</option>
        </select>

        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Types</option>
          <option value="Emploi">Emploi</option>
          <option value="Stage">Stage</option>
          <option value="Freelance">Freelance</option>
        </select>

        <button
          onClick={clearFilters}
          className="p-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
        >
          Clear Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobListingsPage;

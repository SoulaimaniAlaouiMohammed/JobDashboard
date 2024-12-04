import React, { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";
import { jobService } from "../services/jobService";

const DashboardPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 4;


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedJobs = await jobService.getAllJobs();
        setJobs(fetchedJobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);


  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const currentJobs = jobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading dashboard...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {currentJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default DashboardPage;

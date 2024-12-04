import React from "react";
import {
  MdLocationOn,
  MdBusiness,
  MdWork,
  MdAccessTime,
  MdOutlineCorporateFare,
} from "react-icons/md";

const JobCard = ({ job }) => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white shadow-xl rounded-xl p-6 transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {job.company || "Unknown Company"}
        </h3>
        <h4 className="text-lg font-medium text-indigo-600">
          {job.title || "No Title Available"}
        </h4>
      </div>

      {}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
        {}
        <div className="flex items-center space-x-2">
          <MdLocationOn className="text-indigo-500" />
          <span>{job.location || "Unknown Location"}</span>
        </div>
        {}
        <div className="flex items-center space-x-2">
          <MdWork className="text-green-500" />
          <span>{job.type || "Unknown Type"}</span>
        </div>
        {}
        <div className="flex items-center space-x-2">
          <MdBusiness className="text-blue-500" />
          <span>{job.domain || "Unknown Domain"}</span>
        </div>
        {}
        <div className="flex items-center space-x-2">
          <MdOutlineCorporateFare className="text-orange-500" />
          <span>{job.companySize || "Unknown Size"}</span>
        </div>
        {}
        <div className="flex items-center space-x-2">
          <MdAccessTime className="text-gray-500" />
          <span>{job.createdAt ? new Date(job.createdAt).toDateString() : "Recently"}</span>
        </div>
      </div>

      {}
      <p className="text-gray-700 text-sm mb-6 line-clamp-3">
        {job.description || "No Description Available"}
      </p>

      {}
      <a
        href={job.jobLink || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-center w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-indigo-600"
      >
        View Details
      </a>
    </div>
  );
};

export default JobCard;

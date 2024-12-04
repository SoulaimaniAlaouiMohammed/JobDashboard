import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jobService } from "../services/jobService";

const AddJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    jobLink: "",
    type: "",
    domain: "",
    companySize: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
 
  const domains = [
    "Web Development", "Data", "DevOps", "Cybersecurity", "Machine Learning", 
    "Mobile Development", "Cloud Computing", "Artificial Intelligence", "Blockchain", "UI/UX Design",
    "Gestion de Projet", "Reseau"
  ];

 
  const locations = [
    "Rabat", "Casablanca", "Marrakech", "Fes", "Agadir", "Tangier", "Meknes", "Sale", "Kenitra", "Oujda"
  ];


  const jobTypes = ["Emploi", "Stage", "Freelance"];

  const companySizes = [
    "Startup (1-10 employees)", 
    "Small (11-50 employees)", 
    "Medium (51-200 employees)", 
    "Large (200+ employees)"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await jobService.createJob(formData);
      setOpenSuccessModal(true); 
      setFormData({
        title: "",
        company: "",
        location: "",
        description: "",
        jobLink: "",
        type: "",
        domain: "",
        companySize: "",
      });
    } catch (err) {
      setError("Failed to add job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Add Job Opportunity
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            >
              <option value="">Select Location</option>
              {locations.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Job Link</label>
            <input
              type="url"
              name="jobLink"
              value={formData.jobLink}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            >
              <option value="">Select Type</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Domain</label>
            <select
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            >
              <option value="">Select Domain</option>
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>

          {}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Company Size</label>
            <select
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            >
              <option value="">Select Company Size</option>
              {companySizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Job"}
        </button>
      </form>

      {}
      {openSuccessModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm mx-auto text-center">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Success!</h2>
            <p className="text-lg text-gray-700">The job opportunity has been added successfully.</p>
            <button
              onClick={() => setOpenSuccessModal(false)}
              className="mt-4 py-2 px-6 bg-green-600 text-white font-semibold rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddJob;

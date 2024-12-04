import axios from "axios";

const API_URL = "http://localhost:5000/api/jobs";

export const jobService = {
    createJob: async (jobData) => {
        try {
          const response = await axios.post(API_URL, jobData);
          return response.data;
        } catch (error) {
          console.error("Error creating job:", error);
          throw error;
        }
    },
    getAllJobs: async () => {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    },
    getJobsByCity: async (city) => {
      const response = await axios.get(`${API_URL}/by-city`, { params: { location: city } });
      return response.data;
    },
    createJob: async (jobData) => {
      const response = await axios.post(`${API_URL}`, jobData);
      return response.data;
    },
    getJobAnalytics: async () => {
      const response = await axios.get(`${API_URL}/analytics`);
      return response.data;
    },
};
  

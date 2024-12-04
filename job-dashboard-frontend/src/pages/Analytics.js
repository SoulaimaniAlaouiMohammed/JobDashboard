import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Analytics = () => {
  const [analyticsType, setAnalyticsType] = useState("city");
  const [analyticsData, setAnalyticsData] = useState({
    jobsByCity: [],
    jobsByCompany: [],
    jobsByDomain: [],
    jobsByType: [],
  });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs/analytics");
        const data = await response.json();

        console.log("Fetched Analytics Data:", data);
        setAnalyticsData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalytics();
  }, []);


  const handleAnalyticsChange = (event) => {
    setAnalyticsType(event.target.value);
  };


  const selectedDataKey = `jobsBy${analyticsType.charAt(0).toUpperCase() + analyticsType.slice(1)}`;
  const selectedData = analyticsData[selectedDataKey] || [];

  
  const isCityAnalytics = analyticsType === "city";

  const chartLabels = selectedData.map((item) =>
    isCityAnalytics ? item.location || "Unknown" : item[analyticsType] || "Unknown"
  );
  const chartCounts = selectedData.map((item) => Number(item.count) || 0);


  const totalCount = chartCounts.reduce((total, count) => total + count, 0);
  const chartPercentages = chartCounts.map((count) => ((count / totalCount) * 100).toFixed(2));

 
  const barChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: `Jobs by ${analyticsType}`,
        data: chartCounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };


  const pieChartData = {
    labels: chartLabels.map((label, index) => `${label} (${chartPercentages[index]}%)`),
    datasets: [
      {
        label: `Jobs by ${analyticsType}`,
        data: chartCounts,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };


  const barChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const percentage = chartPercentages[index];
            return `${context.dataset.label}: ${context.raw} (${percentage}%)`;
          },
        },
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const percentage = chartPercentages[index];
            return `${context.label}: ${context.raw} (${percentage}%)`;
          },
        },
      },
    },
  };

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Advanced Analytics</h1>

      {}
      <div className="mb-8">
        <label htmlFor="analytics" className="block text-gray-700 font-medium mb-2">
          Select Analytics
        </label>
        <select
          id="analytics"
          value={analyticsType}
          onChange={handleAnalyticsChange}
          className="block w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="city">Jobs by City</option>
          <option value="company">Jobs by Company</option>
          <option value="domain">Jobs by Domain</option>
          <option value="type">Jobs by Type</option>
        </select>
      </div>

      {}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">{`Jobs by ${analyticsType} (Bar Chart)`}</h2>
          <Bar data={barChartData} options={barChartOptions} />
        </div>

        {}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">{`Jobs by ${analyticsType} (Pie Chart)`}</h2>
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;

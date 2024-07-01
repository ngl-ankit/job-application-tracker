import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState("Haryana");
  const [cities, setCities] = useState([
    "Gurgaon",
    "Faridabad",
    "Rohtak",
    "Hisar",
  ]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  const APP_ID = "4d22e21b";
  const API_KEY = "4a2daec91cbd7b27f2606a721fe23c25";

  const STATES = [
    { name: "Haryana", cities: ["Gurgaon", "Faridabad", "Rohtak", "Hisar"] },
    {
      name: "Punjab",
      cities: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
    },
    { name: "Delhi", cities: ["New Delhi"] },
    { name: "Uttar Pradesh", cities: ["Lucknow", "Kanpur", "Agra", "Noida"] },
    { name: "Maharashtra", cities: ["Mumbai", "Pune", "Nashik", "Thane"] },
    {
      name: "Gujarat",
      cities: ["Gandhinagar", "Ahmedabad", "Rajkot", "Surat"],
    },
    {
      name: "West Bengal",
      cities: ["Kolkata", "Siliguri", "Asansol", "Durgapur"],
    },
    { name: "Rajasthan", cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota"] },
    { name: "Himachal Pradesh", cities: ["Shimla", "Manali", "Dharamshala"] },
    { name: "Uttarakhand", cities: ["Dehradun", "Mussoorie", "Nainital"] },
    { name: "Jammu and Kashmir", cities: ["Srinagar", "Jammu", "Leh"] },
    { name: "Ladakh", cities: ["Leh", "Kargil"] },
    { name: "Bihar", cities: ["Patna", "Gaya", "Bhagalpur"] },
    { name: "Madhya Pradesh", cities: ["Indore", "Bhopal", "Gwalior"] },
  ];

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);

    let API_URL = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${APP_ID}&app_key=${API_KEY}&results_per_page=33&what=developer`;

    if (selectedCity) {
      API_URL += `&where=${selectedCity}`;
    } else if (selectedState) {
      API_URL += `&where=${selectedState}`;
    }

    try {
      const response = await axios.get(API_URL);
      setJobs(formatJobs(response.data.results));
    } catch (err) {
      setError("Failed to fetch job listings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const formatJobs = (jobs) => {
    return jobs.map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      details: getDetails(job),
      description: job.description,
      contract_time: job.contract_time,
      redirect_url: job.redirect_url,
      experience: job.experience,
    }));
  };

  const getDetails = (job) => {
    if (job.salary_min && job.salary_max) {
      return `Salary: $${job.salary_min} - $${job.salary_max}`;
    } else if (job.salary_min) {
      return `Minimum Salary: $${job.salary_min}`;
    } else if (job.salary_max) {
      return `Maximum Salary: $${job.salary_max}`;
    } else if (
      job.category &&
      Array.isArray(job.category.label) &&
      job.category.label.length > 0
    ) {
      return `Skills: ${job.category.label.join(", ")}`;
    }

    if (job.company && job.company.display_name) {
      return `Company: ${job.company.display_name}`;
    }
    if (job.contract_time) {
      return `Contract Type: ${job.contract_time}`;
    }
    if (job.education) {
      return `Education: ${job.education}`;
    }
    if (job.experience) {
      return `Experience: ${job.experience}`;
    }
    if (job.work_type) {
      return `Work Type: ${job.work_type}`;
    }

    return `Location: ${job.location.display_name}`;
  };

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);

    const selectedStateObject = STATES.find(
      (state) => state.name === stateName
    );
    setCities(selectedStateObject ? selectedStateObject.cities : []);
    setSelectedCity("");
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  useEffect(() => {
    fetchJobs();
  }, [selectedState, selectedCity]);

  return (
    <Layout>
      <div className="p-6 bg-gradient-to-r from-violet-600  via-black to-blue-600 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Developers Job Listings
        </h2>
        <div className="mb-4 flex flex-col md:flex-row items-center justify-center">
          <div className="mb-2 md:mb-0">
            <label className="text-white">Select State:</label>
            <select
              className="ml-2 p-2 rounded bg-gray-800 text-white"
              value={selectedState}
              onChange={handleStateChange}
            >
              {STATES.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          {cities.length > 0 && (
            <div className="ml-4">
              <label className="text-white">Select City:</label>
              <select
                className="ml-2 p-2 rounded bg-gray-800 text-white"
                value={selectedCity}
                onChange={handleCityChange}
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {loading && <div className="text-white">Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-2">
                {job.title}
              </h3>
              <p className="text-white mb-4">{job.company}</p>
              <div className="text-white">
                <p>Location: {job.location}</p>
                <p>{job.details}</p>
                <p>Description: {job.description.substring(0, 100)}...</p>
                <button
                  className="text-blue-400 hover:underline mt-9"
                  onClick={() => handleViewJob(job)}
                >
                  View Job
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedJob && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-gray-800 p-6 rounded-lg z-10 overflow-y-auto max-w-screen-lg">
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-400"
                onClick={handleCloseModal}
              >
                &#x2715;
              </button>
              <h3 className="text-3xl font-bold text-white mb-4">
                {selectedJob.title}
              </h3>
              <p className="text-white mb-2">{selectedJob.company}</p>
              <p className="text-white mb-2">
                Location: {selectedJob.location}
              </p>
              <p className="text-white mb-4">
                Description:{" "}
                {selectedJob.description
                  ? selectedJob.description
                  : "Description not available"}
              </p>
              <p className="text-white mb-4">
                info: This job listing provides an opportunity in the{" "}
                {selectedJob.location} area with {selectedJob.company} as the
                employer. The position offers the chance to engage in{" "}
                {selectedJob.category
                  ? selectedJob.category.join(", ")
                  : "various"}{" "}
                skills, making it ideal for those looking to expand their
                expertise. For more details, please visit Adzuna for further
                information.
              </p>

              <a
                href={selectedJob.redirect_url}
                className="text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply for job
              </a>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default JobListings;

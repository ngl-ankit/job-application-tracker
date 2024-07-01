import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { db } from "../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

import { FiBriefcase } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch applications from Firestore on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "applications"));
        const apps = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplications(apps);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applications: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Navigate to view all applications page
  const handleViewAllApplications = () => {
    navigate("/applications/all");
  };

  return (
    <Layout>
      <div className="relative min-h-screen bg-gradient-to-r from-blue-600  via-black to-purple-600   overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
        </div>
        <main className="relative z-10 max-w-7xl mx-auto p-6">
          <div className="bg-gray-800 bg-opacity-80 text-white shadow-lg rounded-lg p-8 mb-12">
            <h2 className="text-4xl font-bold mb-6">Job Applications</h2>
            <p className="text-lg mb-6">
              Welcome to your job application tracker. Manage and track the
              status of all your job applications in one place, keeping your job
              hunt organized and efficient.
            </p>
            <p className="text-lg">
              Navigate through the links above to view all applications or add a
              new one. Stay updated and never miss an opportunity!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading state
              <p className="text-gray-400 text-lg col-span-full text-center">
                Loading...
              </p>
            ) : applications.length > 0 ? (
              // Display applications
              applications.map((application) => (
                <div
                  key={application.id}
                  className="relative bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-indigo-600 mb-4">
                      {application.company}
                    </h3>
                    <p className="text-gray-800 mb-2">
                      Position: {application.position}
                    </p>
                    <p className="text-gray-800 mb-2">
                      Status: {application.status}
                    </p>
                    <p className="text-gray-600">
                      Date Applied: {application.dateApplied}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 p-6 flex justify-center items-center space-x-4">
                    {/* Button to view all applications */}
                    <button
                      onClick={handleViewAllApplications}
                      className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
                    >
                      View All Applications
                    </button>
                    {/* Icon for briefcase */}
                    <button className="text-white hover:text-gray-300 transition duration-300">
                      <FiBriefcase className="text-2xl" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              // No applications found
              <div className="col-span-full flex items-center justify-center">
                <p className="text-gray-400 text-lg">
                  No job applications found.{" "}
                  <span className="ml-2">
                    <FiBriefcase className="inline-block align-middle text-3xl text-gray-300" />
                  </span>
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Dashboard;

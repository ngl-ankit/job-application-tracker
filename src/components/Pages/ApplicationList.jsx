import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";

import { db } from "../Firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  doc,
  writeBatch,
} from "firebase/firestore";
import ApplicationItem from "./ApplicationItem";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    id: null,
    company: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let appQuery = collection(db, "applications");

        if (filterStatus !== "") {
          appQuery = query(appQuery, where("status", "==", filterStatus));
        }

        if (sortBy === "dateApplied") {
          appQuery = query(appQuery, orderBy("dateApplied", "desc"));
        } else if (sortBy === "company") {
          appQuery = query(appQuery, orderBy("company"));
        }

        const querySnapshot = await getDocs(appQuery);
        const apps = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplications(apps);
        setIsLoading(false);
        checkNotifications(apps);
      } catch (error) {
        console.error("Error fetching applications: ", error);
      }
    };

    fetchData();
  }, [filterStatus, sortBy]);

  const handleFilterChange = (e) => {
    const status = e.target.value;
    setFilterStatus(status);
  };

  const handleSortChange = (e) => {
    const sort = e.target.value;
    setSortBy(sort);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "applications", deleteConfirm.id));
      setApplications(
        applications.filter((app) => app.id !== deleteConfirm.id)
      );
      setDeleteConfirm({ open: false, id: null, company: "" });
    } catch (error) {
      console.error("Error deleting application: ", error);
    }
  };

  const openDeleteConfirm = (appId, company) => {
    setDeleteConfirm({ open: true, id: appId, company });
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirm({ open: false, id: null, company: "" });
  };

  const checkNotifications = async (apps) => {
    try {
      const batch = writeBatch(db);

      apps.forEach((app) => {
        if (app.status === "interview_scheduled") {
          const notificationData = {
            type: "interview_scheduled",
            title: `${app.company} Interview Scheduled`,
            message: `Interview on ${app.interviewDay}, ${app.interviewDate}`,
            timestamp: new Date().toISOString(),
          };

          const notificationRef = doc(collection(db, "notifications"));
          batch.set(notificationRef, notificationData);
        }
      });

      await batch.commit();
    } catch (error) {
      console.error("Error triggering notifications: ", error);
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-r from-violet-700  via-black to-blue-700 min-h-screen">
        <div className="max-w-5xl mx-auto p-6  bg-gray-900 bg-opacity-80  rounded-lg shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <div>
                <label className="text-white">Filter by Status:</label>
                <select
                  value={filterStatus}
                  onChange={handleFilterChange}
                  className="px-2 py-1 rounded-md bg-white text-gray-900"
                >
                  <option value="">All</option>
                  <option value="applied">Applied</option>
                  <option value="interview_scheduled">
                    Interview Scheduled
                  </option>
                  <option value="interview_in_progress">
                    Interview in Progress
                  </option>
                  <option value="interview_completed">
                    Interview Completed
                  </option>
                  <option value="offer_received">Offer Received</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="text-white">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="px-2 py-1 rounded-md bg-white text-gray-900"
                >
                  <option value="">Select</option>
                  <option value="dateApplied">Date Applied</option>
                  <option value="company">Company</option>
                  <option value="position">Position</option>
                </select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center text-white text-2xl h-64">
              Loading...
            </div>
          ) : applications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  <ApplicationItem application={application} />
                  <div className="flex justify-end mt-2 mr-2">
                    <button
                      onClick={() =>
                        openDeleteConfirm(application.id, application.company)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full px-2 py-1 shadow-md transition duration-300 ease-in-out"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-300 text-center text-xl mt-8">
              No job applications found. Add your first application!
            </p>
          )}

          {deleteConfirm.open && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                <p className="text-lg text-gray-800 mb-4">
                  Are you sure you want to delete the application from{" "}
                  <span className="font-semibold">{deleteConfirm.company}</span>
                  ?
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full px-3 py-2 shadow-md mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={closeDeleteConfirm}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full px-3 py-2 shadow-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationList;

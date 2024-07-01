import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { db } from "../Firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ApplicationForm = () => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewDay, setInterviewDay] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date().toLocaleDateString();
      const docRef = await addDoc(collection(db, "applications"), {
        company,
        position,
        status,
        dateApplied: dateApplied || currentDate,
        description,
        website,
        contactName,
        contactEmail,
        interviewDate: status === "interview_scheduled" ? interviewDate : "",
        interviewDay: status === "interview_scheduled" ? interviewDay : "",
      });
      console.log("Document written with ID: ", docRef.id);
      setIsSuccess(true);
      resetForm();
      setTimeout(() => setIsSuccess(false), 3000); // Reset success message after 3 seconds
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const resetForm = () => {
    setCompany("");
    setPosition("");
    setStatus("");
    setDateApplied("");
    setDescription("");
    setWebsite("");
    setContactName("");
    setContactEmail("");
    setInterviewDate("");
    setInterviewDay("");
  };

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);

    // Reset interview fields when status changes
    if (selectedStatus !== "interview_scheduled") {
      setInterviewDate("");
      setInterviewDay("");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-violet-600  via-black to-blue-600 overflow-hidden">
        <div className="relative bg-gray-900 bg-opacity-80 rounded-lg p-8 shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">
            Add New Application
          </h2>
          {isSuccess && (
            <div className="bg-green-500 text-white text-center p-3 mb-4 rounded-md">
              Application successfully added!
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label
                htmlFor="company"
                className="absolute left-2 -top-4 text-xs font-semibold text-gray-300"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter company name"
                required
              />
            </div>
            <div className="relative">
              <label
                htmlFor="position"
                className="absolute left-2 -top-4 text-xs font-semibold text-gray-300"
              >
                Position
              </label>
              <input
                type="text"
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter position title"
                required
              />
            </div>
            <div className="relative">
              <label
                htmlFor="status"
                className="absolute left-2 -top-4 text-xs font-semibold text-gray-300"
              >
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={handleStatusChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                required
              >
                <option value="">Select Status</option>
                <option value="applied">Applied</option>
                <option value="interview_scheduled">Interview Scheduled</option>
                <option value="interview_in_progress">
                  Interview in Progress
                </option>
                <option value="interview_completed">Interview Completed</option>
                <option value="offer_received">Offer Received</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="relative">
              <label
                htmlFor="dateApplied"
                className="absolute left-2 -top-4 text-xs font-semibold text-gray-300"
              >
                Date Applied
              </label>
              <input
                type="date"
                id="dateApplied"
                value={dateApplied}
                onChange={(e) => setDateApplied(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                required
              />
            </div>
            {status === "interview_scheduled" && (
              <>
                <div className="relative">
                  <label
                    htmlFor="interviewDate"
                    className="absolute left-2 -top-4 text-xs font-semibold text-gray-300"
                  >
                    Interview Date
                  </label>
                  <input
                    type="date"
                    id="interviewDate"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="interviewDay"
                    className="absolute left-2 -top-4 text-xs font-semibold text-gray-300"
                  >
                    Interview Day
                  </label>
                  <input
                    type="text"
                    id="interviewDay"
                    value={interviewDay}
                    onChange={(e) => setInterviewDay(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    placeholder="e.g., Monday"
                  />
                </div>
              </>
            )}

            <div className="relative">
              <label
                htmlFor="website"
                className="absolute left-2 -top-4 text-xs font-semibold text-gray-300"
              >
                Website
              </label>
              <input
                type="text"
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter company website"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="contactName"
                className="absolute left-2 -top-4 text-xs font-semibold text-gray-300"
              >
                Contact Name
              </label>
              <input
                type="text"
                id="contactName"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter contact name"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="contactEmail"
                className="absolute left-2 -top-4 text-xs font-semibold text-gray-300"
              >
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter contact email"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="description"
                className="absolute left-2 -top-4 text-xs font-semibold text-gray-300"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-1 py-1 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300 h-32 resize-none"
                placeholder="Enter application details or description"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 transform hover:scale-105"
            >
              Add Application
            </button>
          </form>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 block w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 transform hover:scale-105"
          >
            Go Back
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationForm;

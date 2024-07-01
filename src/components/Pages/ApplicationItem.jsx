import React from "react";
import { format } from "date-fns";

const ApplicationItem = ({ application }) => {
  const {
    company,
    position,
    status,
    dateApplied,
    description,
    website,
    contactName,
    contactEmail,
    interviewDate,
    interviewDay,
  } = application;

  // Format dateApplied if available
  const formattedDate = dateApplied
    ? format(new Date(dateApplied), "MMMM dd, yyyy")
    : "Not specified";

  return (
    <div className="p-4 bg-white rounded shadow-md overflow-hidden">
      <h3 className="text-xl font-bold mb-2">{company}</h3>
      <p className="text-gray-600">Position: {position || "No position"}</p>
      <p className="text-gray-600">Status: {status}</p>
      <p className="text-gray-600">Date Applied: {formattedDate}</p>

      {status === "interview_scheduled" && (
        <>
          <p className="text-gray-600">
            Interview Date: {interviewDate || "No interview date"}
          </p>
          <p className="text-gray-600">
            Interview Day: {interviewDay || "No interview day"}
          </p>
        </>
      )}

      <p className="text-gray-600">
        Description: {description || "No description provided"}
      </p>
      <p className="text-gray-600">Website: {website || "No website"}</p>
      <p className="text-gray-600">
        Contact Name: {contactName || "No contact name"}
      </p>
      <p className="text-gray-600">
        Contact Email: {contactEmail || "No contact email"}
      </p>
    </div>
  );
};

export default ApplicationItem;

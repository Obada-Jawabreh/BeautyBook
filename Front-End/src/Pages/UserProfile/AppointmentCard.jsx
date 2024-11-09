import React from 'react';

export const AppointmentCard = ({ appointment, generateSingleBookingPDF }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-3">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <h3 className="font-bold text-xl text-[#FF6F61]">
            {appointment.provider?.firstName} {appointment.provider?.lastName}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              appointment.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : appointment.status === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {appointment.status}
          </span>
        </div>
        <button
          onClick={() => generateSingleBookingPDF(appointment)}
          className="text-prim-button hover:text-hover-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </button>
      </div>
      <div className="space-y-1 text-gray-600">
        <p>
          Date:{" "}
          {new Date(appointment.appointment.schedule_date).toLocaleDateString()}
        </p>
        <p>
          Time: {appointment.appointment.start_time} -{" "}
          {appointment.appointment.end_time}
        </p>
        <p className="font-medium">
          Price: ${appointment.service?.price?.toFixed(2) || "N/A"}
        </p>
        <p className="font-medium">
          Service: {appointment.service?.name || "Service Name"}
        </p>
      </div>
    </div>
  );
};

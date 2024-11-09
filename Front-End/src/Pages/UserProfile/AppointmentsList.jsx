import React from 'react';
import { AppointmentCard } from './AppointmentCard';
const AppointmentsList = ({ 
  bookingData, 
  bookingDataLoading, 
  bookingDataError,
  generateAllBookingsPDF,
  generateSingleBookingPDF 
}) => {
  return (
    <div className="bg-[#EEF6F9] rounded-lg shadow-md p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-prim-dark">
          My Appointments
        </h2>
        <button
          onClick={generateAllBookingsPDF}
          className="px-4 py-2 bg-prim-button hover:bg-hover-button text-white rounded-md"
        >
          Download All PDF
        </button>
      </div>

      {bookingDataLoading ? (
        <p>Loading...</p>
      ) : bookingDataError ? (
        <p>Error loading appointments.</p>
      ) : bookingData && bookingData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookingData.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              generateSingleBookingPDF={generateSingleBookingPDF}
            />
          ))}
        </div>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};
export default AppointmentsList;
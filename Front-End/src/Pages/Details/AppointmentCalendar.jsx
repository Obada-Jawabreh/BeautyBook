import React from 'react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AppointmentCalendar = ({ 
  selectedDate, 
  handleDateChange, 
  isDateAvailable, 
  appointmentData,
  selectedTime,
  handleTimeChange 
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-prime-white mb-4">
        Available Appointments
      </h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            if (isDateAvailable(date)) {
              return "bg-green-500 text-white";
            } else {
              return "bg-gray-300 text-gray-600";
            }
          }
        }}
      />
      {selectedDate && isDateAvailable(selectedDate) && (
        <div className="mt-4">
          <h3 className="text-lg font-bold text-prime-white">
            Available Times
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {appointmentData
              .filter(
                (appointment) =>
                  new Date(appointment.schedule_date).toDateString() ===
                  selectedDate.toDateString()
              )
              .map((appointment, index) => (
                <button
                  key={index}
                  className={`bg-[#FFFAF0] p-2 rounded-lg shadow-lg hover:bg-[#FFA8B9] hover:text-white transition-colors duration-300 ${
                    selectedTime === appointment.start_time
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                  onClick={() => handleTimeChange(appointment)}
                >
                  {appointment.start_time}
                  {" - "}
                  {appointment.end_time}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;
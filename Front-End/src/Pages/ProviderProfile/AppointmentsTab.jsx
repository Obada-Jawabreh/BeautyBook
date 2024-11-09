import React from "react";
import { Edit, Trash2 } from "lucide-react";
import Calendar from "react-calendar";
import updateData from "../../Components/customHooks/updateData";
import axios from "axios";
const AppointmentsTab = ({
  appointments,
  setAppointments,
  selectedDate,
  setSelectedDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  editingIndex,
  setEditingIndex,
  addDataLoading,
  handleAddAppointment,
  timeSlots,
}) => {
  const handleEditAppointment = async (index) => {
    const appointment = appointments[index];
    const updatedData = {
      schedule_date: selectedDate.toISOString(),
      start_time: startTime,
      end_time: endTime,
    };

    try {
      const response = await updateData(
        "appointment",
        "update",
        appointment.id,
        updatedData
      );

      if (response.success) {
        console.log("Appointment updated successfully");
      } else {
        console.error("Failed to update appointment");
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };
  const handleDelete = async (appointmentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/appointment/dele/${appointmentId}`
      );

      if (response.data.success) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter(
            (appointment) => appointment.id !== appointmentId
          )
        );
        console.log("Appointment deleted successfully");
      } else {
        console.error("Failed to delete appointment");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };
  return (
    <div className="space-y-6">
      {/* Schedule Appointment */}
      <div className="bg-prime-white rounded-lg shadow-md">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-prim-dark">
            Schedule Appointment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Calendar selectedDate={selectedDate} onChange={setSelectedDate} />
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-prim-dark mb-1">
                  Start Time
                </label>
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-2 border border-[#FFA8B9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFA8B9]"
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-prim-dark mb-1">
                  End Time
                </label>
                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-2 border border-[#FFA8B9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFA8B9]"
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleAddAppointment}
                disabled={addDataLoading}
                className={`w-full bg-prim-button hover:bg-hover-button text-white py-2 px-4 rounded-md transition-colors duration-200 ${
                  addDataLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {addDataLoading
                  ? "Adding..."
                  : editingIndex !== null
                  ? "Update Appointment"
                  : "Add Appointment"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scheduled Appointments */}
      <div className="bg-prime-white rounded-lg shadow-md">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-prim-dark">
            Scheduled Appointments
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appointments.map((app, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg text-[#46808B]">
                      {new Date(app.schedule_date).toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                    </p>
                    <p className="text-gray-600">
                      {new Date(app.schedule_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-gray-600">
                      {app.start_time} - {app.end_time}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditAppointment(index)}
                      className="text-prim-button hover:text-hover-button"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(app.id)} // تمرير معرّف الموعد
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsTab;

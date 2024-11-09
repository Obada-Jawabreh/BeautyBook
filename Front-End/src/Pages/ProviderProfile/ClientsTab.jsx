import React, { useState, useEffect } from "react";
import useFetchData from "../../Components/customHooks/get";
import updateData from "../../Components/customHooks/updateData";

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const ClientsTab = () => {
  const {
    data: bookingData,
    loading: bookingDataLoading,
    error: bookingDataError,
  } = useFetchData("booking", "get");

  const [bookingStatus, setBookingStatus] = useState([]);

  useEffect(() => {
    if (bookingData) {
      setBookingStatus(bookingData); 
    }
  }, [bookingData]);

  if (bookingDataLoading) return <div>Loading...</div>;
  if (bookingDataError) return <div>Error: {bookingDataError.message}</div>;

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await updateData("booking", "update", id, {
        status: newStatus,
      });

      if (response.status === 200) {
        setBookingStatus((prevStatus) =>
          prevStatus.map((booking) =>
            booking.id === id ? { ...booking, status: newStatus } : booking
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookingStatus.map((booking) => (
        <div
          key={booking.id}
          className="bg-white rounded-lg shadow p-4 flex flex-col space-y-4"
        >
          <div className="flex items-center space-x-4">
            <img
              src={`http://localhost:5001/${booking.user?.profilePicture}`}
              alt={`Client `}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold">
                Client {booking.user.firstName} {booking.user.lastName}
              </h3>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p>
              <strong>Date:</strong>{" "}
              {formatDate(booking.appointment.schedule_date)}
            </p>
            <p>
              <strong>Time:</strong> {booking.appointment.start_time} -{" "}
              {booking.appointment.end_time}
            </p>
            <p>
              <strong>Service:</strong> {booking.service?.name}
            </p>
            <p>
              <strong>Price:</strong> ${booking.service?.price}
            </p>
            <p>
              <strong>Service Date:</strong> {formatDate(booking.createdAt)}
            </p>
          </div>

          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => handleStatusChange(booking.id, "upcoming")}
              disabled={
                booking.status === "upcoming" || booking.status === "completed"
              }
              className={`px-4 py-2 rounded transition-colors duration-300 ${
                booking.status === "pending"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-600 hover:bg-gray-400"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => handleStatusChange(booking.id, "completed")}
              disabled={booking.status === "completed"}
              className={`px-4 py-2 rounded transition-colors duration-300 ${
                booking.status === "upcoming"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-300 text-gray-600 hover:bg-gray-400"
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientsTab;

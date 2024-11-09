import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchProviderById } from "../../Redux/providers/providerThunk";
import useFetchDataById from "../../Components/customHooks/getByID";
import AddData from "./../../Components/customHooks/postData";
import StickyNavbar from "../../Components/Layout/Navbar";
import ProviderHeader from "./ProviderHeader";
import AppointmentCalendar from "./AppointmentCalendar";
import ServicesList from "./ServicesList";
import BookingSummary from "./BookingSummary";

const ProviderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProvider, loading, error } = useSelector(
    (state) => state.providers
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProviderById(id));
    }
  }, [id, dispatch]);

  const {
    data: appointmentData,
    loading: fetchLoading,
    error: fetchError,
  } = useFetchDataById("appointment", "get", id);

  const {
    data: services,
    loading: servicesfetchLoading,
    error: servicesfetchError,
  } = useFetchDataById("service", "get", id);

  const {
    addData,
    loading: addedDataLoading,
    error: addDataError,
    success,
  } = AddData("booking", "add");

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingSummary, setBookingSummary] = useState(null);
  const [selectedIdAppointment, setSelectedIdAppointment] = useState(null);

  const handleDateChange = (date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
    } else {
      Swal.fire({
        title: "Appointment Not Available",
        text: "The selected date is not available for booking. Please choose another date.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time.start_time);
    setSelectedIdAppointment(time.id);
  };

  const handleServiceChange = (service) => {
    setSelectedService(service);
  };

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime && selectedService) {
      setBookingSummary({
        date: selectedDate.toLocaleDateString(),
        time: selectedTime,
        service: selectedService.name,
        price: selectedService.price,
      });
    } else {
      Swal.fire({
        title: "Incomplete Booking",
        text: "Please select a date, time, and service to book an appointment.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  const confirmBooking = async () => {
    const bookingData = {
      appointmentId: selectedIdAppointment,
      serviceId: selectedService.id,
      ProviderID: parseInt(id),
    };

    try {
      const response = await addData(bookingData);
      if (response.success) {
        Swal.fire({
          title: response.message,
          text: "Your appointment has been successfully booked. Please check your profile to see the status of.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      setBookingSummary(null);
    } catch (error) {
      Swal.fire({
        title: "Booking Failed",
        text: error.response?.data?.message || "Something went wrong",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const isDateAvailable = (date) => {
    return appointmentData?.some(
      (appointment) =>
        new Date(appointment.schedule_date).toDateString() ===
        date.toDateString()
    );
  };

  if (loading || fetchLoading || servicesfetchLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <StickyNavbar />
      <div className="bg-prim-dark">
        <div className="rounded-lg p-8">
          <ProviderHeader selectedProvider={selectedProvider} />

          <div className="grid grid-cols-2 gap-8">
            <AppointmentCalendar
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
              isDateAvailable={isDateAvailable}
              appointmentData={appointmentData}
              selectedTime={selectedTime}
              handleTimeChange={handleTimeChange}
            />

            <ServicesList
              services={services}
              selectedService={selectedService}
              handleServiceChange={handleServiceChange}
            />
          </div>

          {bookingSummary && (
            <BookingSummary
              bookingSummary={bookingSummary}
              confirmBooking={confirmBooking}
            />
          )}

          {!bookingSummary && (
            <div className="mt-8 text-center">
              <button
                className="bg-prim-button text-white py-2 px-4 rounded hover:bg-hover-button transition-colors duration-300"
                onClick={handleBookAppointment}
              >
                Book Appointment
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProviderDetailsPage;
import React, { useState, useEffect } from "react";
import ProviderInfo from "./ProviderInfo";
import NavigationTabs from "./NavigationTabs";
import AppointmentsTab from "./AppointmentsTab";
import ServicesTab from "./ServicesTab";
import ClientsTab from "./ClientsTab";
import AddData from "./../../Components/customHooks/postData";
import useFetchData from "../../Components/customHooks/get";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../Redux/users/userThunk";

const ServiceProviderProfile = () => {
  const dispatch = useDispatch();
  const {
    isAuthenticated,
    user: provider,
    loading,
    error,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState("appointments");
  const {
    addData,
    loading: addedDataLoading,
    error: addDataError,
    success,
  } = AddData("appointment", "add");

  const {
    data: appointmentData,
    loading: appointmentDataLoading,
    error: appointmentDataError,
  } = useFetchData("appointment", "get");

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (appointmentData && Array.isArray(appointmentData)) {
      const formattedAppointments = appointmentData.map((appointment) => ({
        id: appointment.id,
        schedule_date: new Date(appointment.schedule_date).toLocaleDateString(),
        start_time: appointment.start_time,
        end_time: appointment.end_time,
      }));
      setAppointments(formattedAppointments);
    }
  }, [appointmentData]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("9:00 AM");
  const [endTime, setEndTime] = useState("10:00 AM");
  const [editingIndex, setEditingIndex] = useState(null);
  const [addDataLoading, setAddDataLoading] = useState(false);

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const handleAddAppointment = async () => {
    setAddDataLoading(true);

    const newAppointment = {
      schedule_date: selectedDate.toISOString(),
      start_time: startTime,
      end_time: endTime,
    };

    try {
      if (editingIndex !== null) {
        const updatedAppointments = [...appointments];
        updatedAppointments[editingIndex] = {
          id: appointments[editingIndex].id,
          ...newAppointment,
        };
        setAppointments(updatedAppointments);
        setEditingIndex(null);
      } else {
        setAppointments([...appointments, newAppointment]);
      }

      const response = await addData(newAppointment);

      if (response.success) {
        console.log("Appointment added successfully");
      } else {
        console.error("Failed to add appointment");
      }
    } catch (error) {
      console.error("Error adding appointment:", error);
    }

    setAddDataLoading(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "appointments":
        return (
          <AppointmentsTab
            appointments={appointments}
            setAppointments={setAppointments}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
            addDataLoading={addDataLoading}
            handleAddAppointment={handleAddAppointment}
            timeSlots={timeSlots}
          />
        );
      case "services":
        return <ServicesTab services={[]} />;
      case "clients":
        return <ClientsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-prime-white">
      <ProviderInfo provider={provider} />
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container mx-auto px-4 py-8">{renderTabContent()}</div>
    </div>
  );
};

export default ServiceProviderProfile;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  updateUser,
  updateProfilePicture,
} from "../../Redux/users/userThunk";
import { jsPDF } from "jspdf";
import StickyNavbar from "../../Components/Layout/Navbar";
import useFetchData from "../../Components/customHooks/get";
import ProfileImage from "./ProfileImage";
import ProfileForm from "./ProfileForm";
import AppointmentsList from "./AppointmentsList";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
    email: user?.email || "",
  });

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setEditedProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
      });
    }
  }, [user]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      await dispatch(updateProfilePicture(formData));
      dispatch(fetchUser());
    }
  };

  const handleEditSave = async () => {
    if (isEditing) {
      const userData = {
        firstName: editedProfile.firstName,
        lastName: editedProfile.lastName,
        phoneNumber: editedProfile.phoneNumber,
      };
      await dispatch(updateUser(userData)).unwrap();
      dispatch(fetchUser());
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditedProfile({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phoneNumber: user?.phoneNumber || "",
      email: user?.email || "",
    });
    setIsEditing(false);
  };

  const {
    data: bookingData,
    loading: bookingDataLoading,
    error: bookingDataError,
  } = useFetchData("booking", "get");

  const generateSingleBookingPDF = (booking) => {
    const doc = new jsPDF();
    doc.setFont("Helvetica", "normal");

    doc.setFontSize(18);
    doc.text("Booking Details", 14, 20);

    doc.setFontSize(12);
    doc.text(
      `Provider: ${booking.provider?.firstName} ${booking.provider?.lastName}`,
      14,
      40
    );
    doc.text(`Status: ${booking.status}`, 14, 50);
    doc.text(
      `Date: ${new Date(
        booking.appointment.schedule_date
      ).toLocaleDateString()}`,
      14,
      60
    );
    doc.text(
      `Time: ${booking.appointment.start_time} - ${booking.appointment.end_time}`,
      14,
      70
    );
    doc.text(`Price: $${booking.service?.price?.toFixed(2) || "N/A"}`, 14, 80);
    doc.text(`Service: ${booking.service?.name || "Service Name"}`, 14, 90);

    doc.save(`booking-${booking.id}.pdf`);
  };

  const generateAllBookingsPDF = () => {
    const doc = new jsPDF();

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(18);
    doc.text("My Appointments", 14, 20);

    if (bookingData && bookingData.length > 0) {
      let yPosition = 40;

      bookingData.forEach((appointment, index) => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(14);
        doc.text(`Appointment ${index + 1}`, 14, yPosition);

        doc.setFontSize(12);
        yPosition += 10;
        doc.text(
          `Provider: ${appointment.provider?.firstName} ${appointment.provider?.lastName}`,
          14,
          yPosition
        );

        yPosition += 10;
        doc.text(`Status: ${appointment.status}`, 14, yPosition);

        yPosition += 10;
        doc.text(
          `Date: ${new Date(
            appointment.appointment.schedule_date
          ).toLocaleDateString()}`,
          14,
          yPosition
        );

        yPosition += 10;
        doc.text(
          `Time: ${appointment.appointment.start_time} - ${appointment.appointment.end_time}`,
          14,
          yPosition
        );

        yPosition += 10;
        doc.text(
          `Price: $${appointment.service?.price?.toFixed(2) || "N/A"}`,
          14,
          yPosition
        );

        yPosition += 10;
        doc.text(
          `Service: ${appointment.service?.name || "Service Name"}`,
          14,
          yPosition
        );

        yPosition += 20;
      });

      doc.save("all-appointments.pdf");
    } else {
      doc.text("No appointments found.", 14, 30);
      doc.save("appointments.pdf");
    }
  };

  return (
    <>
      <StickyNavbar />
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="bg-[#EEF6F9] rounded-lg shadow-md p-8 mt-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ProfileImage user={user} handleImageUpload={handleImageUpload} />
            <ProfileForm
              user={user}
              isEditing={isEditing}
              editedProfile={editedProfile}
              setEditedProfile={setEditedProfile}
              setIsEditing={setIsEditing}
              handleEditSave={handleEditSave}
              handleCancel={handleCancel}
            />
          </div>
        </div>

        <AppointmentsList
          bookingData={bookingData}
          bookingDataLoading={bookingDataLoading}
          bookingDataError={bookingDataError}
          generateAllBookingsPDF={generateAllBookingsPDF}
          generateSingleBookingPDF={generateSingleBookingPDF}
        />
      </div>
    </>
  );
};

export default UserProfile;

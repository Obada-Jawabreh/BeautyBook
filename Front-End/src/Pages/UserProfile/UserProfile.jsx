import React, { useState, useEffect } from "react";
import { Camera, Edit2, Check, X } from "lucide-react";
import defaultImage from "./../../assets/images/user.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  updateUser,
  updateProfilePicture,
} from "../../Redux/users/userThunk";
import StickyNavbar from "../../Components/Layout/Navbar";
import useFetchData from "../../Components/customHooks/get";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
    email: user?.email || "",
  });

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
 

  return (
    <>
      <StickyNavbar />
      <div className="max-w-6xl mx-auto p-6 space-y-8 ">
        {/* Profile Header */}
        <div className="bg-[#EEF6F9] rounded-lg shadow-md p-8 mt-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={`http://localhost:5001/${user?.profilePicture}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = defaultImage;
                  }}
                />
              </div>
              <label className="absolute bottom-0 right-0 p-2 bg-prim-button hover:bg-hover-button rounded-full cursor-pointer">
                <Camera className="h-5 w-5 text-white" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-prim-dark">
                  {user?.firstName} {user?.lastName}
                </h1>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-prim-button hover:text-hover-button"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleEditSave}
                      className="text-green-500 hover:text-green-600"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={editedProfile.firstName}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        firstName: e.target.value,
                      })
                    }
                    className="p-2 border border-[#FFA8B9] rounded-md"
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    value={editedProfile.lastName}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        lastName: e.target.value,
                      })
                    }
                    className="p-2 border border-[#FFA8B9] rounded-md"
                    placeholder="Last Name"
                  />
                  <input
                    type="tel"
                    value={editedProfile.phoneNumber}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        phoneNumber: e.target.value,
                      })
                    }
                    className="p-2 border border-[#FFA8B9] rounded-md"
                    placeholder="Phone"
                  />
                  <input
                    type="email"
                    value={editedProfile.email}
                    disabled
                    className="p-2 border border-gray-300 rounded-md bg-gray-50"
                    placeholder="Email"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Email:</span> {user?.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Phone:</span>{" "}
                    {user?.phoneNumber}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="bg-[#EEF6F9] rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-prim-dark">
            My Appointments
          </h2>

          {bookingDataLoading ? (
            <p>Loading...</p>
          ) : bookingDataError ? (
            <p>Error loading appointments.</p>
          ) : bookingData && bookingData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookingData.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-lg shadow p-6 space-y-3"
                >
                  <div className="flex justify-start items-center space-x-4 mb-4">
                    <h3 className="font-bold text-xl text-[#FF6F61]">
                      {appointment.provider?.firstName}{" "}
                      {appointment.provider?.lastName}
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
                  <div className="space-y-1 text-gray-600">
                    <p>
                      Date:{" "}
                      {new Date(
                        appointment.appointment.schedule_date
                      ).toLocaleDateString()}
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
              ))}
            </div>
          ) : (
            <p>No appointments found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;

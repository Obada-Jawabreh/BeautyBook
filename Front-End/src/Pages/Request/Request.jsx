import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import ImageUpload from "./ImageUpload";
import FormFields from "./FormFields";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../Redux/users/userThunk";
import AddData from "./../../Components/customHooks/postData";

const PractitionerRegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, error } = useSelector(
    (state) => state.user
  );
  const {
    addData,
    loading: addedDataLoading,
    error: addDataError,
    success,
  } = AddData("request", "add");
  // ------------------------------------------------------------------------------
  // if (!user) {
  //   navigate("/");
  // } else if (user && !loading && isAuthenticated) {
  //   navigate("/RequestPage");
  // }

  // ------------------------------------------------------------------------------
  const [formData, setFormData] = useState({
    phoneNumber: "",
    profession: "",
    aboutMe: "",
    certificate: null,
    profilePicture: null,
    resume: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  useEffect(() => {
    if (!loading) {
      if (!user) {
        dispatch(fetchUser());
      } else {
        navigate("/Request");
      }
    }
  }, [user, dispatch, navigate]);

  useEffect(() => {
    if (user) {
      setFormData((prevState) => ({
        ...prevState,
        phoneNumber: user.phoneNumber || "",
        profilePicture: user.profilePicture
          ? `http://localhost:5001/${user.profilePicture}`
          : null,
      }));
      setPreviewImage(
        user.profilePicture
          ? `http://localhost:5001/${user.profilePicture}`
          : null
      );
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });

    if (name === "profilePicture" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formDataToSend = new FormData();
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("profession", formData.profession);
    formDataToSend.append("aboutMe", formData.aboutMe);
    formDataToSend.append("certificate", formData.certificate);
    formDataToSend.append("profilePicture", formData.profilePicture);
    formDataToSend.append("resume", formData.resume);

    try {
      await addData(formDataToSend);
      navigate("/");
      console.log("Form submitted successfully:");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        "An error occurred while submitting the form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-teal-100 p-4 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-6xl">
          <div className="flex flex-col md:flex-row">
            <Sidebar>
              <ImageUpload
                previewImage={previewImage}
                handleFileChange={handleFileChange}
              />
            </Sidebar>
            <div className="md:w-2/3 p-8 overflow-y-auto">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                Register as a Practitioner
              </h2>
              <ImageUpload
                previewImage={previewImage}
                handleFileChange={handleFileChange}
                mobileOnly={true}
                user={user}
              />
              <FormFields
                formData={formData}
                handleInputChange={handleInputChange}
                handleFileChange={handleFileChange}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
              {submitError && (
                <p className="text-red-500 mt-4">{submitError}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PractitionerRegistrationForm;

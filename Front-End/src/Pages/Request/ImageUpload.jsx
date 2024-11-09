import React, { useRef, useEffect, useState } from "react";

const ImageUpload = ({ previewImage, handleFileChange, user, mobileOnly = false }) => {
  const [imageSrc, setImageSrc] = useState(previewImage || user?.profilePicture || "");

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user?.profilePicture) {
      setImageSrc(`http://localhost:5001/${user.profilePicture}`);
    }
  }, [user]);

  useEffect(() => {
    if (previewImage) {
      setImageSrc(previewImage); 
    }
  }, [previewImage]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const containerClass = mobileOnly
    ? "block md:hidden mb-8 flex flex-col items-center"
    : "hidden md:flex flex-col items-center mt-8";

  const imageContainerClass = mobileOnly
    ? "h-32 w-32 rounded-full border-4 border-gray-300 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity duration-300 flex items-center justify-center bg-gray-200"
    : "h-40 w-40 rounded-full border-4 border-gray-300 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity duration-300 flex items-center justify-center bg-gray-200";

  return (
    <div className={containerClass}>
      <div className={imageContainerClass} onClick={handleImageClick}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        ) : (
          <svg
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        name="profilePicture"
        id="profilePicture"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <p className="mt-2 text-sm">Click to upload profile picture</p>
    </div>
  );
};

export default ImageUpload;

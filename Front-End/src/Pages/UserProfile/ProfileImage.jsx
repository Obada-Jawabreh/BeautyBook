// ProfileImage.js
import React from 'react';
import { Camera } from "lucide-react";
import defaultImage from "./../../assets/images/user.png";


const ProfileImage = ({ user, handleImageUpload }) => {
  return (
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
  );
};
export default ProfileImage;
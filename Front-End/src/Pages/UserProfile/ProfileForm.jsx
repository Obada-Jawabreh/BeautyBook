import React from 'react';
import { Edit2, Check, X } from "lucide-react";
const ProfileForm = ({ 
  user, 
  isEditing, 
  editedProfile, 
  setEditedProfile, 
  setIsEditing, 
  handleEditSave, 
  handleCancel 
}) => {
  return (
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
            <span className="font-medium">Phone:</span> {user?.phoneNumber}
          </p>
        </div>
      )}
    </div>
  );
};
export default ProfileForm;

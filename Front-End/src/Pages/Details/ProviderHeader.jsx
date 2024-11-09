import React from 'react';

const ProviderHeader = ({ selectedProvider }) => {
  return (
    <div className="flex items-center mb-8 mt-12">
      <img
        src={`http://localhost:5001/${selectedProvider?.profilePicture}`}
        alt="Provider Profile"
        className="w-24 h-24 rounded-full object-cover mr-4"
      />
      <div>
        <h1 className="text-3xl font-bold text-prime-white">
          {selectedProvider?.firstName} {selectedProvider?.lastName}
        </h1>
        <p className="text-lg text-prime-white font-medium">
          {selectedProvider?.requests[0].profession}
        </p>
      </div>
    </div>
  );
};

export default ProviderHeader;

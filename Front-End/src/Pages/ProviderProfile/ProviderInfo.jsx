import React from "react";

const ProviderInfo = ({ provider }) => {
  return (
    <div className="bg-prim-dark text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={`http://localhost:5001/${provider?.profilePicture}`}
            alt={`${provider?.firstName} ${provider?.lastName}`}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          <div className="text-center md:text-right">
            <h1 className="text-3xl font-bold">{`${provider?.firstName} ${provider?.lastName}`}</h1>
            <p className="text-xl opacity-90">{provider?.requests[0].profession}</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderInfo;
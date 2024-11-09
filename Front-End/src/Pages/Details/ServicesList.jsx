import React from 'react';

const ServicesList = ({ services, selectedService, handleServiceChange }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-prime-white mb-4">
        Services
      </h2>
      <ul className="space-y-2">
        {services &&
          services.length > 0 &&
          services.map((service) => (
            <li
              key={service.id}
              className={`bg-[#FFFAF0] p-4 rounded-lg shadow-lg flex justify-between items-center hover:bg-[#FFA8B9] hover:text-white transition-colors duration-300 ${
                selectedService?.id === service.id
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
              onClick={() => handleServiceChange(service)}
            >
              <div>
                <h3 className="text-lg font-semibold">
                  {service.name}
                </h3>
                <p className="text-[#FFA8B9] font-medium">
                  {service.description}
                </p>
              </div>
              <p className="text-[#FF6F61] font-bold">
                ${service.price.toFixed(2)}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ServicesList;
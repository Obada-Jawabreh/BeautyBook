import React from "react";

const NavigationTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex space-x-4">
          {[
            { id: "appointments", label: "Appointments" },
            { id: "services", label: "Services" },
            { id: "clients", label: "Clients" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-prim-dark border-b-2 border-[#46808B]"
                  : "text-gray-600 hover:text-prim-dark"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;

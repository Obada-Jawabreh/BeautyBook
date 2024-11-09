import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import AddData from "./../../Components/customHooks/postData";
import useFetchData from "../../Components/customHooks/get";
import updateData from "../../Components/customHooks/updateData";
import axios from "axios";
const ServicesTab = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    price: "",
    description: "",
  });
  const {
    addData,
    loading: addedDataLoading,
    error: addDataError,
    success,
  } = AddData("service", "add");
  const {
    data: serviceData,
    loading: serviceDataLoading,
    error: serviceDataError,
  } = useFetchData("service", "get");

  useEffect(() => {
    if (serviceData && Array.isArray(serviceData)) {
      const formattedAppointments = serviceData.map((service) => ({
        id: service.id,
        name: service.name,
        price: service.price,
        description: service.description,
      }));
      setServices(formattedAppointments);
    }
  }, [serviceData]);

  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddService = async () => {
    if (newService.name && newService.price) {
      try {
        if (editingIndex !== null) {
          const serviceToUpdate = services[editingIndex];

          if (serviceToUpdate.id) {
            const response = await updateData(
              "service",
              "update",
              serviceToUpdate.id,
              newService
            );

            if (response && response.success) {
              const updatedService = response.data;
              const updatedServices = [...services];
              updatedServices[editingIndex] = updatedService;
              setServices(updatedServices);
              setEditingIndex(null);
              setNewService({ name: "", price: "", description: "" });
            } else {
              console.error("Failed to update service");
            }
          } else {
            console.error("Service ID is missing!");
          }
        } else {
          const response = await addData(newService);
          if (response && response.success) {
            const addedService = response.data;
            setServices([...services, addedService]);
            setNewService({ name: "", price: "", description: "" });
          } else {
            console.error("Failed to add service");
          }
        }
      } catch (error) {
        console.error("Error adding/updating service:", error);
      }
    }
  };
  // ----------------------------------------------------
  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewService(services[index]);
  };

  const handleDelete = async (serviceId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/service/dele/${serviceId}`
      );

      if (response.data.success) {
        setServices((prevServices) =>
          prevServices.filter((service) => service.id !== serviceId)
        );
        console.log("Services deleted successfully");
      } else {
        console.error("Failed to delete Services");
      }
    } catch (error) {
      console.error("Error deleting Services:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#EEF6F9] rounded-lg shadow-md">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-prim-dark">
            Add/Edit Service
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              value={newService?.name}
              onChange={(e) =>
                setNewService({ ...newService, name: e.target.value })
              }
              placeholder="Service Name"
              className="w-full p-2 border border-[#FFA8B9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFA8B9]"
            />
            <input
              type="number"
              value={newService?.price}
              onChange={(e) =>
                setNewService({ ...newService, price: e.target.value })
              }
              placeholder="Price"
              className="w-full p-2 border border-[#FFA8B9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFA8B9]"
            />
            <textarea
              value={newService?.description}
              onChange={(e) =>
                setNewService({ ...newService, description: e.target.value })
              }
              placeholder="Service Description"
              className="w-full p-2 border border-[#FFA8B9] rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-[#FFA8B9]"
            />
            <button
              onClick={handleAddService}
              className="w-full bg-prim-button hover:bg-hover-button text-white py-2 px-4 rounded-md transition-colors duration-200"
            >
              {editingIndex !== null ? "Update Service" : "Add Service"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#EEF6F9] rounded-lg shadow-md">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-prim-dark">
            Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services && services.length > 0 ? (
              services.map((service, index) =>
                service && service.name ? ( 
                  <div key={index} className="bg-white rounded-lg shadow p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-lg text-prim-dark">
                          {service.name}
                        </p>
                        <p className="text-gray-600">${service.price}</p>
                        <p className="text-gray-600 mt-2">
                          {service.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(index)}
                          className="text-prim-button hover:text-hover-button"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null
              )
            ) : (
              <p>No services available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesTab;

const prisma = require("./../config/prisma");

class Service {
  static async AddService({ provider_id, name, price, description }) {
    try {
      const newService = await prisma.service.create({
        data: {
          provider_id,
          name,
          price: parseFloat(price),
          description,
        },
      });

      return { serviceId: newService.id };
    } catch (error) {
      console.error("Error inserting service data:", error);
      throw error;
    }
  }

  // -------------------------------------------------
  static async GetServicesByProviderId(provider_id) {
    try {
            const providerIdInt = parseInt(provider_id, 10);

      const services = await prisma.service.findMany({
        where: { provider_id:providerIdInt },
      });
      return services;
    } catch (error) {
      console.error("Error fetching services:", error);
      throw new Error("Error fetching services");
    }
  }

  // -------------------------------------------------
  static async UpdateService({ service_id, name, price, description }) {
    try {
      const serviceIdInt = parseInt(service_id, 10);

      const updatedService = await prisma.service.update({
        where: { id: serviceIdInt },
        data: { name, price: parseFloat(price), description },
      });

      return { success: true, serviceId: updatedService.id };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // -------------------------------------------------
  static async DeleteService(service_id) {
    try {
      const serviceIdInt = parseInt(service_id, 10);

      const deletedService = await prisma.service.delete({
        where: { id: serviceIdInt },
      });

      return { success: true };
    } catch (error) {
      if (error.code === "P2025") {
        return { success: false, message: "Service not found" };
      }
      console.error("Error deleting service:", error);
      throw error;
    }
  }
}

module.exports = Service;

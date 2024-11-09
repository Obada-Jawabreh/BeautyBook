const Service = require("../models/serviceModel");

exports.AddService = async (req, res) => {
  const provider_id = req.user.id;
  try {
    const { name, price, description } = req.body;

    if (!provider_id || !name || !price || !description) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        received: {
          provider_id,
          name,
          price,
          description,
        },
      });
    }

    const result = await Service.AddService({
      provider_id,
      name,
      price,
      description,
    });

    res.status(200).json({
      success: true,
      message: "Service added successfully",
      serviceId: result.serviceId,
    });
  } catch (error) {
    console.error("Error in AddService:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// -------------------------------------------------
exports.GetServices = async (req, res) => {
  const provider_id = req.params.service_id || req.user.id;

  try {
    const services = await Service.GetServicesByProviderId(provider_id);

    if (!services || services.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No services found for this provider",
      });
    }

    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// -------------------------------------------------
exports.UpdateService = async (req, res) => {
  const { service_id } = req.params;
  const { name, price, description } = req.body;

  if (!name || !price || !description)
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });

  try {
    const result = await Service.UpdateService({
      service_id,
      name,
      price,
      description,
    });

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Service updated successfully",
        serviceId: result.serviceId,
      });
    }

    res.status(404).json({
      success: false,
      message: "Service not found or not authorized",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// -------------------------------------------------
exports.DeleteService = async (req, res) => {
  const { service_id } = req.params;

  try {
    const result = await Service.DeleteService(service_id);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Service deleted successfully",
      });
    }

    return res.status(404).json({
      success: false,
      message: result.message || "Service not found",
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

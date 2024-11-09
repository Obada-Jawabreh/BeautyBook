const Bookings = require("../models/bookingModel");

exports.CreateBooking = async (req, res) => {
  const { appointmentId, serviceId, ProviderID } = req.body;
  console.log(appointmentId, serviceId, ProviderID);

  const clientId = req.user.id;
  try {
    const newBooking = await Bookings.CreateBooking(
      clientId,
      appointmentId,
      serviceId,
      ProviderID
    );
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Error creating booking",
      error: error.message,
    });
  }
};

// ------------------------------------------------------------

exports.GetBookingById = async (req, res) => {
  const userId = req.user.id;
  const role = req.user.role;

  try {
    const booking = await Bookings.GetBookingById(userId, role);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching booking by ID",
    });
  }
};
// ------------------------------------------------------------

exports.UpdateBookingStatus = async (req, res) => {
  const {  status } = req.body;
  const id = req.params.id
  try {
    const booking = await Bookings.UpdateBookingStatus(id, status);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating booking status",
      error: error.message,
    });
  }
};

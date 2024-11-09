const Appointment = require("../models/appointmentModel");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// // -----------------------------------------------------------
exports.AddAppointments = async (req, res) => {
  const provider_id = req.user.id;
  try {
    const { schedule_date, start_time, end_time } = req.body;

    if (!provider_id || !schedule_date || !start_time || !end_time) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        received: {
          userId: provider_id,
          schedule_date,
          start_time,
          end_time,
        },
      });
    }

    const result = await Appointment.AddAppointments({
      provider_id,
      schedule_date,
      start_time,
      end_time,
    });

    res.status(200).json({
      success: true,
      message: "Appointment added successfully",
      scheduleId: result.scheduleId,
    });
  } catch (error) {
    console.error("Error in AddAppointments:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ----------------------------

exports.GetAppointments = async (req, res) => {
  const provider_id = req.params.provider_id || req.user.id;
  try {
    const appointments = await Appointment.GetAppointmentsByProviderId(
      provider_id
    );

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No appointments found for this provider",
      });
    }

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// ------------------------
exports.UpdateAppointment = async (req, res) => {
  const { appointment_id } = req.params;
  const { schedule_date, start_time, end_time } = req.body;

  if (!schedule_date || !start_time || !end_time)
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });

  try {
    const result = await Appointment.UpdateAppointment({
      appointment_id,
      schedule_date,
      start_time,
      end_time,
    });

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Appointment updated successfully",
        appointmentId: result.appointmentId,
      });
    }

    res.status(404).json({
      success: false,
      message: "Appointment not found or not authorized",
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
exports.DeleteAppointment = async (req, res) => {
  const { appointment_id } = req.params;

  try {
    const result = await Appointment.DeleteAppointment(appointment_id);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Appointment deleted successfully",
      });
    }

    return res.status(404).json({
      success: false,
      message: result.message || "Appointment not found",
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

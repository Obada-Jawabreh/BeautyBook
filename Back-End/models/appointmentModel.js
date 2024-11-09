const prisma = require("./../config/prisma");

class Appointment {
  // --------------------------------
  static async AddAppointments({
    provider_id,
    schedule_date,
    start_time,
    end_time,
  }) {
    try {
      const newAppointment = await prisma.appointment.create({
        data: {
          provider_id,
          schedule_date: new Date(schedule_date),
          start_time,
          end_time,
        },
      });

      return { scheduleId: newAppointment.id };
    } catch (error) {
      console.error("Error inserting appointment data:", error);
      throw error;
    }
  }
  // -------------------------------------------------------
  static async GetAppointmentsByProviderId(provider_id) {
    try {
      const providerIdInt = parseInt(provider_id, 10);

      const appointments = await prisma.appointment.findMany({
        where: {
          provider_id: providerIdInt,
        },
      });
      return appointments;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw new Error("Error fetching appointments");
    }
  }
  // -------------------------------------------------------
  static async UpdateAppointment({
    appointment_id,
    schedule_date,
    start_time,
    end_time,
  }) {
    try {
      const appointmentIdInt = parseInt(appointment_id, 10);

      const updatedAppointment = await prisma.appointment.update({
        where: { id: appointmentIdInt },
        data: { schedule_date: new Date(schedule_date), start_time, end_time },
      });

      return { success: true, appointmentId: updatedAppointment.id };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  // ----------------------------------------------
  static async DeleteAppointment(appointment_id) {
    try {
      const appointmentIdInt = parseInt(appointment_id, 10);

      const deletedAppointment = await prisma.appointment.delete({
        where: { id: appointmentIdInt },
      });

      return { success: true }; 
    } catch (error) {
      console.error("Error deleting appointment:", error);
      throw error; 
    }
  }
}

module.exports = Appointment;

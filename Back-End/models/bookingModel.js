const prisma = require("./../config/prisma");

class Bookings {
  static async CreateBooking(clientId, appointmentId, serviceId, ProviderID) {
    try {
      const booking = await prisma.booking.create({
        data: {
          user: {
            connect: { id: clientId },
          },
          appointment: {
            connect: { id: appointmentId },
          },
          service: {
            connect: { id: serviceId },
          },
          provider: {
            connect: { id: ProviderID },
          },
        },
      });
      return booking;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  // -----------------------------------------------------
  static async GetBookingById(userId, role) {
    try {
      const Condition =
        role === "staff"
          ? { providerId: parseInt(userId, 10) }
          : { clientId: parseInt(userId, 10) };

      const booking = await prisma.booking.findMany({
        where: Condition,
        include: {
          user: true,
          appointment: true,
          service: true,
          provider: true,
        },
      });

      return booking;
    } catch (error) {
      console.error("Error fetching booking by ID:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
  // -------------------------------------------
  static async UpdateBookingStatus(id, status) {
    try {
      const booking = await prisma.booking.update({
        where: { id: parseInt(id, 10) },
        data: {
          status: status,
        },
      });

      return booking;
    } catch (error) {
      console.error("Error updating booking status:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}

module.exports = Bookings;

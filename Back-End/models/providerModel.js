const prisma = require("./../config/prisma");

class Providers {
  // ---------------------------
  static async GetAllProviders() {
    try {
      const providers = await prisma.user.findMany({
        where: {
          isActive: true,
          role: "staff",
        },
        include: {
          requests: {
            select: {
              id: true,
              userId: true,
              profession: true,
              certificate: true,
              resume: true,
              aboutMe: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

      return providers;
    } catch (error) {
      console.error("Error fetching Provider data:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
  static async GetProviderById(id) {
    try {
      const provider = await prisma.user.findUnique({
        where: {
          id: parseInt(id, 10), 
        },
        select: {
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
          profilePicture: true,
          requests: {
            select: {
              id: true,
              userId: true,
              profession: true,
              certificate: true,
              resume: true,
              aboutMe: true,
            },
          },
        },
      });

      return provider;
    } catch (error) {
      console.error("Error fetching provider by ID:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }


}

module.exports = Providers;

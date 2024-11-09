const prisma = require("./../config/prisma");

class Requests {
  static async createRequest(
    userId,
    phoneNumber,
    profession,
    aboutMe,
    certificate,
    profilePicture,
    resumePath
  ) {
    try {
      const newRequest = await prisma.request.create({
        data: {
          userId,
          profession,
          certificate,
          resume:resumePath,
          aboutMe,
        },
      });

      await prisma.user.update({
        where: { id: userId },
        data: {
          phoneNumber,
          profilePicture,
        },
      });

      return newRequest;
    } catch (error) {
      console.error("Error creating request:", error);
      throw new Error("Error creating request");
    }
  }
}

module.exports = Requests;

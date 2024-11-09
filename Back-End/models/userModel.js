const bcrypt = require("bcryptjs");
const prisma = require("./../config/prisma");

class Users {
  static async RegisterUser(firstName, lastName, email, password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await prisma.user.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashedPassword,
        },
      });

      return newUser; 
    } catch (error) {
      console.error("Database Error:", error.message);
      throw new Error("Failed to register user.");
    } finally {
      await prisma.$disconnect();
    }
  }

  // ---------------------------login user-----------------------------------------
  static async LoginUser(email, password) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid password");
      }

      return user;
    } catch (error) {
      console.error("Login Error:", error.message);
      throw new Error("Failed to log in.");
    } finally {
      await prisma.$disconnect();
    }
  }
  // // ---------------------------getUserById-----------------------------------------

  static async getUserById(userId) {
    try {
      const userData = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          requests: true,
        },
      });
      if (!userData) {
        throw new Error("User not found");
      }

      console.log("Fetched user data with bookings:", userData);
      return userData;
    } catch (error) {
      throw new Error("Error fetching user data: " + error.message);
    } finally {
      await prisma.$disconnect();
    }
  }
  //   try {
  //     const user = await knex("users")
  //       .leftJoin("applicants_requests", "users.user_id", "applicants_requests.user_id")
  //       .select(
  //         "applicants_requests.*",
  //         "users.firstName",
  //         "users.lastName",
  //         "users.email",
  //         "users.phoneNumber",
  //         "users.profilePicture",
  //         "users.aboutMe",
  //         "users.isApproved",
  //         "users.created_at",
  //         "users.updated_at"
  //       )
  //       .where("users.user_id", userId)
  //       .first();

  //     console.log("Fetched user data:", user);
  //     return user;
  //   } catch (error) {
  //     throw new Error("Error fetching user data: " + error.message);
  //   }
  // }

  // --------------------------------------------------------------

  static async updateUserById(userId, updateData) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
      });
      console.log("Updated user data:", updatedUser);
      return updatedUser;
    } catch (error) {
      throw new Error("Error updating user data: " + error.message);
    } finally {
      await prisma.$disconnect();
    }
  }
}

module.exports = Users;

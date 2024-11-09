const Requests = require("../models/requestModel");
const prisma = require("./../config/prisma");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

exports.createRequest = async (req, res) => {
  const { phoneNumber, profession, aboutMe } = req.body;

  const { profilePicture, certificate, resume } = req.files;

  const profilePicturePath = profilePicture ? profilePicture[0].path : null;
  const certificatePath = certificate ? certificate[0].path : null;
  const resumePath = resume ? resume[0].path : null;

  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user.profilePicture && profilePicturePath) {
      const oldProfilePicturePath = path.join(
        __dirname,
        "../uploads",
        path.basename(user.profilePicture)
      );
      console.log("Attempting to delete:", oldProfilePicturePath);

      if (fs.existsSync(oldProfilePicturePath)) {
        fs.unlink(oldProfilePicturePath, (err) => {
          if (err) {
            console.error("Error deleting old profile picture:", err);
          } else {
            console.log("Old profile picture deleted successfully");
          }
        });
      } else {
        console.log("Old profile picture does not exist");
      }
    }

    const newUser = await Requests.createRequest(
      userId,
      phoneNumber,
      profession,
      aboutMe,
      certificatePath,
      profilePicturePath,
      resumePath
    );

    res
      .status(201)
      .json({ message: "Application created successfully", user: newUser });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const auth = require("./../middleware/authMiddleware");
const upload = require("./../config/multer-config");


router.post("/register/user", userController.registerUser);
router.post("/login/user", userController.loginUser);

router.get("/get", auth, userController.getUserData);
router.put("/update", auth, userController.updateUserData);

router.put(
  "/update/image",
  auth,
  upload.single("image"),
  userController.updateImageUserData
);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;

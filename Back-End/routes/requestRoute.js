const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");
const auth = require("../middleware/authMiddleware");
const upload = require("../config/multer-config");

router.post(
  "/add",
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  auth,
  requestController.createRequest
);

module.exports = router;

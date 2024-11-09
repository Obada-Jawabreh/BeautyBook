const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const auth = require("../middleware/authMiddleware");
const upload = require("../config/multer-config");

router.post("/add", auth, appointmentController.AddAppointments);
router.get("/get", auth, appointmentController.GetAppointments);
router.get("/get/:provider_id", appointmentController.GetAppointments);

router.put("/update/:provider_id", appointmentController.UpdateAppointment);
router.delete("/dele/:appointment_id", appointmentController.DeleteAppointment);

module.exports = router;

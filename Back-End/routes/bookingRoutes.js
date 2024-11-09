const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const auth = require("./../middleware/authMiddleware");

router.post("/add", auth, bookingController.CreateBooking);
router.get("/get", auth, bookingController.GetBookingById);
router.put("/update/:id", auth, bookingController.UpdateBookingStatus);

module.exports = router;

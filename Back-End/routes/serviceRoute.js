const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const auth = require("../middleware/authMiddleware");
const upload = require("../config/multer-config");

router.post("/add", auth, serviceController.AddService);
router.get("/get", auth, serviceController.GetServices);
router.get("/get/:service_id",  serviceController.GetServices);

router.put("/update/:service_id", serviceController.UpdateService);
router.delete("/dele/:service_id", serviceController.DeleteService);

module.exports = router;

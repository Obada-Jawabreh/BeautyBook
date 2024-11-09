const express = require("express");
const router = express.Router();
const providerController = require("../controllers/providerController");
const auth = require("../middleware/authMiddleware");
const upload = require("../config/multer-config");

router.get("/get", providerController.GetProviders);
router.get("/get/:id", providerController.GetProviderById);


module.exports = router;

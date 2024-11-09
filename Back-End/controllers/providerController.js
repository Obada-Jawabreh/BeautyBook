const Providers = require("../models/providerModel");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

exports.GetProviders = async (req, res) => {
  try {
    const Data = await Providers.GetAllProviders();
    res.status(200).json({ data: Data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
// -----------------------------------------------------------

exports.GetProviderById = async (req, res) => {
  try {
    const providerID = req.params.id;
    const Data = await Providers.GetProviderById(providerID);
    if (!Data) {
      return res
        .status(404)
        .json({ success: false, message: "Provider not found" });
    }
    res.status(200).json({ data: Data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
 // -----------------------------------------------------------
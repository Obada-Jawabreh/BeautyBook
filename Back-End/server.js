require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const db = require("./config/dbConfig");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const prisma = require("./config/prisma");
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })  
);
// ---------------------------routes---------------------------------
    
const userRoute = require("./routes/userRoute");
const RequestRoute = require("./routes/requestRoute");
const providerRoute = require("./routes/providerRoute");
const appointmentRoute = require("./routes/appointmentRoute");
const serviceRoute = require("./routes/serviceRoute");
const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api/users", userRoute);
app.use("/api/request", RequestRoute);
app.use("/api/provider", providerRoute);
app.use("/api/appointment", appointmentRoute);
app.use("/api/service", serviceRoute);
app.use("/api/booking", bookingRoutes);

// ---------------------------listen---------------------------------

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

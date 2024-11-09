import { useState } from "react";
import "./App.css";
import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home/home.jsx";
import Register from "./Pages/register/register.jsx";
import Login from "./Pages/login/login.jsx";
import Catalog from "./Pages/Catalog/Catalog.jsx";
import Request from "./Pages/Request/Request.jsx";
import Details from "./Pages/Details/Details.jsx";
import ProviderProfile from "./Pages/ProviderProfile/Profile.jsx";
import UserProfile from "./Pages/UserProfile/UserProfile.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Catalog" element={<Catalog />} />
          <Route path="/Request" element={<Request />} />
          <Route path="/Details/:id" element={<Details />} />
          <Route path="/Provider" element={<ProviderProfile />} />
          <Route path="/UserProfile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import { Container } from "react-bootstrap";
import DeviceLogs from "./components/DeviceLogs";
import SystemSettings from "./components/SystemSettings";
import RoomList from "./components/RoomsList";
import Footer from "./components/Footer";
import RoomDeviceDashboard from "./pages/RoomDeviceDashboard";
import UserForm from "./pages/UserForm";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route exact path="/" element={<RoomList />} />
          <Route path="/logs" element={<DeviceLogs />} />
          <Route path="/settings" element={<SystemSettings />} />
          <Route path="/:roomName/devices" element={<RoomDeviceDashboard />} />
          <Route path="/create-user" element={<UserForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;

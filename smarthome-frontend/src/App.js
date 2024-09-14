import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import { Container } from "react-bootstrap";
import Dashboard from "./pages/Dashboard";
import DeviceLogs from "./components/DeviceLogs";
import SystemSettings from "./components/SystemSettings";
import RoomList from "./components/RoomsList";
import Footer from "./components/Footer";
import RoomDeviceDashboard from "./pages/RoomDeviceDashboard";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/logs" element={<DeviceLogs />} />
          <Route path="/settings" element={<SystemSettings />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route
            path="/rooms/:roomName/devices"
            element={<RoomDeviceDashboard />}
          />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;

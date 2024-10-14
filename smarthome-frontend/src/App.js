import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/NavBar";
import { Container } from "react-bootstrap";
import DeviceLogs from "./components/DeviceLogs";
import SystemSettings from "./components/SystemSettings";
import RoomList from "./components/RoomsList";
import Footer from "./components/Footer";
import RoomDeviceDashboard from "./pages/RoomDeviceDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = "test";

    if (!username) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route exact path="/" element={<RoomList />} />
          <Route path="/logs" element={<DeviceLogs />} />
          <Route path="/settings" element={<SystemSettings />} />
          <Route path="/:roomName/devices" element={<RoomDeviceDashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DeviceLogs from "./pages/DeviceLogs";
import Settings from "./pages/Settings";
import "./App.css";
import DeviceList from "./components/DevicesList";
import RoomList from "./components/RoomsList";
import UserList from "./components/UserList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/logs" element={<DeviceLogs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/devices" element={<DeviceList />} />
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
};

export default App;

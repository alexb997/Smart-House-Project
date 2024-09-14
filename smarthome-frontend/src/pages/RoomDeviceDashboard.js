import React, { useState, useEffect } from "react";
import DeviceCard from "../components/DeviceCard";
import DeviceModal from "../components/DeviceModal";
import { useParams } from "react-router-dom"; // Get the room name from the route

const RoomDeviceDashboard = () => {
  const { roomName } = useParams(); // Extract roomName from URL parameters
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    // Fetch devices in the room based on roomName
    fetch(`/api/rooms/${roomName}/devices`)
      .then((response) => response.json())
      .then((data) => setDevices(data))
      .catch((error) => console.error("Error fetching devices:", error));
  }, [roomName]);

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
  };

  const handleModalClose = () => {
    setSelectedDevice(null);
  };

  return (
    <div className="device-dashboard">
      <h2>Devices in Room {roomName}</h2>
      <div className="device-grid">
        {devices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            onSelect={() => handleDeviceSelect(device)}
          />
        ))}
      </div>

      {selectedDevice && (
        <DeviceModal
          device={selectedDevice}
          show={!!selectedDevice}
          handleClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default RoomDeviceDashboard;

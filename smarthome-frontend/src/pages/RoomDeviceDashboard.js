import React, { useState, useEffect } from "react";
import DeviceCard from "../components/DeviceCard";
import DeviceModal from "../components/DeviceModal";
import { useParams, useLocation } from "react-router-dom";
import { getRoomDevices } from "../service/roomService";

const RoomDeviceDashboard = () => {
  const { roomName } = useParams();
  const location = useLocation();
  const roomId = location.state?.roomId;
  const [modalOpen, setModalOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await getRoomDevices(roomId);
        setDevices(response.data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
    fetchDevices();
  }, [roomName, roomId]);

  const handleOpenModal = (device) => {
    setSelectedDevice(device);
    setModalOpen(!modalOpen);
  };

  const handleCloseModal = () => {
    setModalOpen(!modalOpen);
    setSelectedDevice(null);
  };

  return (
    <div className="device-dashboard">
      <h2>Devices in {roomName}</h2>
      <div className="device-grid">
        {devices.map((device) => (
          <DeviceCard
            key={device.id}
            
            device={device}
            onClick={() => {
              handleOpenModal(device);
            }}
          />
        ))}
      </div>

      {selectedDevice && (
        <DeviceModal
          device={selectedDevice}
          show={modalOpen}
          handleClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default RoomDeviceDashboard;

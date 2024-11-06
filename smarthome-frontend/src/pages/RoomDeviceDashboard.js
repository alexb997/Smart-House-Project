import React, { useState, useEffect } from "react";
import DeviceCard from "../components/DeviceCard";
import DeviceModal from "../components/DeviceModal";
import CreateDeviceModal from "../components/CreateDeviceModal";
import { useParams, useLocation } from "react-router-dom";
import { getRoomDevices } from "../service/roomService";
import { Container, Row, Col } from "react-bootstrap";
import CustomButton from "../components/CustomButton";
import { removeDevice } from "../service/deviceService";
import { createDeviceLog } from "../service/logService";

const RoomDeviceDashboard = () => {
  const { roomName } = useParams();
  const location = useLocation();
  const roomId = location.state?.roomId;
  const userId = Number(localStorage.getItem("userId"));
  const username = localStorage.getItem("username");

  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await getRoomDevices(roomId);
        setDevices(response.data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
    if (roomId) fetchDevices();
  }, [roomId]);

  const handleOpenModal = (device) => {
    setSelectedDevice(device);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDevice(null);
  };

  const toggleCreateModal = () => {
    setCreateModalOpen((prev) => !prev);
  };

  const handleRemoveDevice = async (device) => {
    const log = {
      deviceName: device.name,
      date: new Date().toISOString(),
      message: "Removed device "+ device.name+ " from "+ roomName,
      status: "Remove",
      username: username,
    };

    console.table(log);
    try {
      await createDeviceLog(log);
      await removeDevice(device.id);
      setDevices((prevDevices) => prevDevices.filter((prevDevice) => prevDevice.id !== device.id));
    } catch (error) {
      console.error("Error removing device:", error);
    }
  };

  return (
    <Container>
      <h2 style={{ color: "white" }}>Devices in {roomName}</h2>
      <CustomButton content="Add new device" onClick={toggleCreateModal} />
      <Row>
        {devices.map((device) => (
          <Col xs={12} sm={6} md={3} key={device.id}>
            <DeviceCard device={device} manage={() => handleOpenModal(device)} remove={() => handleRemoveDevice(device)}  />
          </Col>
        ))}
      </Row>

      {selectedDevice && (
        <DeviceModal
          device={selectedDevice}
          show={modalOpen}
          handleClose={handleCloseModal}
        />
      )}

      {createModalOpen && (
        <CreateDeviceModal
          show={createModalOpen}
          handleClose={toggleCreateModal}
          roomId={roomId}
          userId={userId}
        />
      )}
    </Container>
  );
};

export default RoomDeviceDashboard;

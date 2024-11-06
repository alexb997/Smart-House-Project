import React, { useState, useEffect } from "react";
import DeviceCard from "../components/DeviceCard";
import DeviceModal from "../components/DeviceModal";
import CreateDeviceModal from "../components/CreateDeviceModal";
import { useParams, useLocation } from "react-router-dom";
import { getRoomDevices } from "../service/roomService";
import { Container, Row, Col } from "react-bootstrap";
import CustomButton from "../components/CustomButton";

const RoomDeviceDashboard = () => {
  const { roomName } = useParams();
  const location = useLocation();
  const roomId = location.state?.roomId;
  const userId = Number(localStorage.getItem("userId"));

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

  return (
    <Container>
      <h2 style={{ color: "white" }}>Devices in {roomName}</h2>
      <CustomButton content="Add new device" onClick={toggleCreateModal} />
      <Row>
        {devices.map((device) => (
          <Col xs={12} sm={6} md={3} key={device.id}>
            <DeviceCard device={device} onClick={() => handleOpenModal(device)} />
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

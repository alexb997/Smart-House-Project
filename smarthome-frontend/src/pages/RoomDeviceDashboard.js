import React, { useState, useEffect } from "react";
import DeviceCard from "../components/DeviceCard";
import DeviceModal from "../components/DeviceModal";
import CreateDeviceModal from "../components/CreateDeviceModal"; // Import the modal for creating a device
import { useParams, useLocation } from "react-router-dom";
import { getRoomDevices } from "../service/roomService";
import { Button, Container, Row, Col } from "react-bootstrap";
import CustomButton from "../components/CustomButton";

const RoomDeviceDashboard = () => {
  const { roomName } = useParams();
  const location = useLocation();
  const roomId = location.state?.roomId;
  const userId = Number(localStorage.getItem("userId"));
  const [modalOpen, setModalOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false); // State for the Create Device modal

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

  const toggleCreateModal = () => {
    setCreateModalOpen(!createModalOpen);
  };

  return (
    <Container>
      <h2 style={{ color: "white" }}>Devices in {roomName}</h2>
      <CustomButton
        content="Add new device"
        onClick={toggleCreateModal}
      ></CustomButton>
      <p></p>

      <Row>
        {devices.map((device) => (
          <Col xs={12} sm={6} md={3} key={device.id}>
            <DeviceCard
              device={device}
              onClick={() => {
                handleOpenModal(device);
              }}
            />
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

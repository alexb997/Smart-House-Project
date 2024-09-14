import React, { useEffect, useState } from "react";
import DeviceCard from "../components/DeviceCard";
import DeviceModal from "../components/DeviceModal";
import { getDevices } from "../service/deviceService";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import CreateDeviceModal from "../components/CreateDeviceModal";

const Dashboard = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await getDevices();
        setDevices(response.data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    fetchDevices();
  }, []);

  const handleOpenModal = (device) => {
    setSelectedDevice(device);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  return (
    <Container>
      <Button onClick={handleOpenCreateModal} className="mb-4">
        Create New Device
      </Button>
      <Row key={devices.length}>
        {devices.map((device) => (
          <Col xs={12} sm={6} md={4} key={device.deviceId} className="mb-3">
            <DeviceCard
              device={device}
              onClick={() => handleOpenModal(device)}
            />
          </Col>
        ))}
      </Row>
      {selectedDevice && (
        <DeviceModal
          device={selectedDevice}
          show={modalOpen}
          onClose={handleCloseModal}
          onHide={handleCloseModal}
        />
      )}
      {createModalOpen && (
        <CreateDeviceModal
          show={createModalOpen}
          handleClose={handleCloseCreateModal}
        />
      )}
    </Container>
  );
};

export default Dashboard;

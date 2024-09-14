import React, { useEffect, useState } from "react";
import DeviceCard from "../components/DeviceCard";
import DeviceModal from "../components/DeviceModal";
import { getDevices } from "../service/deviceService";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import CreateDeviceModal from "../components/CreateDeviceModal";

const Dashboard = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await getDevices();
        setDevices(response.data);
      } catch (error) {
        console.error("Error fetching devices:", error);
        setError("Failed to load devices. Please try again.");
      } finally {
        setLoading(false);
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
    setSelectedDevice(null);
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

      {loading && (
        <div className="text-center my-4">
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="my-4">
          {error}
        </Alert>
      )}

      {!loading && !error && devices.length > 0 && (
        <Row>
          {devices.map((device) => (
            <Col xs={12} sm={6} md={4} key={device.deviceId} className="mb-3">
              <DeviceCard
                device={device}
                onClick={() => handleOpenModal(device)}
              />
            </Col>
          ))}
        </Row>
      )}

      {!loading && !error && devices.length === 0 && (
        <div className="text-center my-4">
          <p>No devices available. Please create one.</p>
        </div>
      )}

      {selectedDevice && (
        <DeviceModal
          device={selectedDevice}
          show={modalOpen}
          onClose={handleCloseModal}
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

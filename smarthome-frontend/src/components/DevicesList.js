import React, { useEffect, useState } from "react";
import instance from "../axios.js";
import { Button, Modal, Form, Card, Container, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons for better UI

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentDevice, setCurrentDevice] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    const response = await instance.get("/api/devices");
    setDevices(response.data);
  };

  const handleDelete = async (id) => {
    await instance.delete(`/api/devices/${id}`);
    fetchDevices();
  };

  const handleShowModal = (device = {}) => {
    setCurrentDevice(device);
    setIsEditing(!!device.id);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (isEditing) {
      await instance.put(`/api/devices/${currentDevice.id}`, currentDevice);
    } else {
      await instance.post("/api/devices", currentDevice);
    }
    setShowModal(false);
    fetchDevices();
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Devices</h2>
      <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>
        Add Device
      </Button>
      <Row>
        {devices.map((device) => (
          <Col md={4} key={device.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{device.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{device.type}</Card.Subtitle>
                <Card.Text>Status: {device.status}</Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="warning" onClick={() => handleShowModal(device)}>
                    <FaEdit /> Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(device.id)}>
                    <FaTrash /> Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Device" : "Add Device"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="deviceName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter device name"
                value={currentDevice.name || ""}
                onChange={(e) =>
                  setCurrentDevice({ ...currentDevice, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="deviceType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                value={currentDevice.type || ""}
                onChange={(e) =>
                  setCurrentDevice({ ...currentDevice, type: e.target.value })
                }
              >
                <option>LIGHT</option>
                <option>THERMOSTAT</option>
                <option>CAMERA</option>
                <option>DOORBELL</option>
                <option>LOCK</option>
                <option>SENSOR</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="deviceStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter device status"
                value={currentDevice.status || ""}
                onChange={(e) =>
                  setCurrentDevice({ ...currentDevice, status: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {isEditing ? "Save Changes" : "Add Device"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DeviceList;

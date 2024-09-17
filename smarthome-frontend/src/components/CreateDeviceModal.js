import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { createDevice } from "../service/deviceService";

const CreateDeviceModal = ({ show, handleClose, roomId, userId }) => {
  const [deviceData, setDeviceData] = useState({
    name: "",
    type: "LIGHT",
    status: false,
    brightness: 0,
    temperature: 0,
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDeviceData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const { name, type, status, brightness, temperature } = deviceData;
    const newDevice = {
      name,
      type,
      status,
      brightness: type === "LIGHT" ? brightness : null,
      temperature: type === "THERMOSTAT" ? temperature : null,
      roomId,
      userId,
    };

    try {
      await createDevice(newDevice);
      handleClose();
    } catch (err) {
      setError("Failed to create device.");
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Device</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group controlId="deviceName">
            <Form.Label>Device Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={deviceData.name}
              onChange={handleInputChange}
              placeholder="Enter device name"
            />
          </Form.Group>

          <Form.Group controlId="deviceType">
            <Form.Label>Device Type</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={deviceData.type}
              onChange={handleInputChange}
            >
              <option value="LIGHT">Light</option>
              <option value="THERMOSTAT">Thermostat</option>
              <option value="CAMERA">Camera</option>
              <option value="DOORBELL">Doorbell</option>
              <option value="LOCK">Lock</option>
              <option value="SENSOR">Sensor</option>
            </Form.Control>
          </Form.Group>

          {deviceData.type === "LIGHT" && (
            <Form.Group controlId="deviceBrightness">
              <Form.Label>Brightness</Form.Label>
              <Form.Control
                type="range"
                name="brightness"
                min="0"
                max="100"
                value={deviceData.brightness}
                onChange={handleInputChange}
              />
            </Form.Group>
          )}

          {deviceData.type === "THERMOSTAT" && (
            <Form.Group controlId="deviceTemperature">
              <Form.Label>Temperature</Form.Label>
              <Form.Control
                type="number"
                name="temperature"
                value={deviceData.temperature}
                onChange={handleInputChange}
                min="0"
                max="50"
              />
            </Form.Group>
          )}

          <Form.Group controlId="deviceStatus">
            <Form.Check
              type="checkbox"
              label="Device On"
              name="status"
              checked={deviceData.status}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create Device
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDeviceModal;

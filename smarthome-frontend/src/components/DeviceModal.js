import React, { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { updateDeviceSettings, controlDevice } from "../service/deviceService";

const DeviceModal = ({ device, show, handleClose }) => {
  const [brightness, setBrightness] = useState(device.brightness || 0);
  const [temperature, setTemperature] = useState(device.temperature || 0);
  const [motionDetectionEnabled, setMotionDetectionEnabled] = useState(
    device.motionDetectionEnabled || false
  );

  const handleBrightnessChange = async (event) => {
    const newValue = event.target.value;
    setBrightness(newValue);
    let tempDevice = device;
    tempDevice.brightness = newValue;
    await updateDeviceSettings(device.id, tempDevice);
  };

  const handleTemperatureChange = async (event) => {
    const newValue = event.target.value;
    setTemperature(newValue);
    let tempDevice = device;
    tempDevice.temperature = newValue;
    await updateDeviceSettings(device.id, tempDevice);
  };

  const handleMotionDetectionToggle = async () => {
    const newStatus = !motionDetectionEnabled;
    setMotionDetectionEnabled(newStatus);
    let tempDevice = device;
    tempDevice.motionDetectionEnabled = newStatus;
    await updateDeviceSettings(device.id, tempDevice);
  };

  const handleToggleDevice = async () => {
    const newStatus = !device.status;
    let tempDevice = device;
    tempDevice.status = newStatus;
    await updateDeviceSettings(device.id, tempDevice);
    device.status = newStatus;
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Manage {device.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Device Type:</strong> {device.type}
        </p>
        <p>
          <strong>Status:</strong> {device.status ? "On" : "Off"}
        </p>

        {device.type === "LIGHT" && (
          <Form.Group controlId="brightness">
            <Form.Label>Brightness: {brightness}%</Form.Label>
            <InputGroup>
              <Form.Control
                type="range"
                min="0"
                max="100"
                value={brightness}
                onChange={handleBrightnessChange}
              />
            </InputGroup>
          </Form.Group>
        )}

        {device.type === "THERMOSTAT" && (
          <Form.Group controlId="temperature">
            <Form.Label>Temperature: {temperature}°C</Form.Label>
            <Form.Control
              type="number"
              value={temperature}
              onChange={handleTemperatureChange}
              min="0"
              max="50"
            />
          </Form.Group>
        )}

        {device.type === "CAMERA" && (
          <Form.Group controlId="motionDetection">
            <Form.Check
              type="switch"
              label={`Motion Detection: ${
                motionDetectionEnabled ? "Enabled" : "Disabled"
              }`}
              checked={motionDetectionEnabled}
              onChange={handleMotionDetectionToggle}
            />
          </Form.Group>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant={device.status ? "danger" : "primary"}
          onClick={handleToggleDevice}
        >
          {device.status ? "Turn Off" : "Turn On"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeviceModal;

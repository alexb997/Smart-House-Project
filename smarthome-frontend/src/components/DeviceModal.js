import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  InputGroup,
  Spinner,
  Alert,
} from "react-bootstrap";
import { updateDeviceSettings } from "../service/deviceService";
import PropTypes from "prop-types";

const DeviceModal = ({ device, show, handleClose }) => {
  const [brightness, setBrightness] = useState(device.brightness || 0);
  const [temperature, setTemperature] = useState(device.temperature || 0);
  const [motionDetectionEnabled, setMotionDetectionEnabled] = useState(
    device.motionDetectionEnabled || false
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateDevice = async (updatedDevice) => {
    setLoading(true);
    setError(null);
    try {
      await updateDeviceSettings(device.id, updatedDevice);
    } catch (err) {
      console.error("Error updating device:", err);
      setError("Failed to update device settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBrightnessChange = (event) => {
    const newValue = event.target.value;
    setBrightness(newValue);
    handleUpdateDevice({ ...device, brightness: newValue });
  };

  const handleTemperatureChange = (event) => {
    const newValue = event.target.value;
    if (newValue >= 0 && newValue <= 50) {
      setTemperature(newValue);
      handleUpdateDevice({ ...device, temperature: newValue });
    }
  };

  const handleMotionDetectionToggle = () => {
    const newStatus = !motionDetectionEnabled;
    setMotionDetectionEnabled(newStatus);
    handleUpdateDevice({ ...device, motionDetectionEnabled: newStatus });
  };

  const handleToggleDevice = () => {
    const newStatus = !device.status;
    handleUpdateDevice({ ...device, status: newStatus });
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

        {error && <Alert variant="danger">{error}</Alert>}

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
          disabled={loading}
        >
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : device.status ? (
            "Turn Off"
          ) : (
            "Turn On"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeviceModal.propTypes = {
  device: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    brightness: PropTypes.number,
    temperature: PropTypes.number,
    motionDetectionEnabled: PropTypes.bool,
  }).isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default DeviceModal;

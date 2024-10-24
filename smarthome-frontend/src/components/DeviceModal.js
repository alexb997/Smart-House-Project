import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner, Alert } from "react-bootstrap";
import { updateDeviceSettings } from "../service/deviceService";
import PropTypes from "prop-types";
import TypeSetting from "./TypeSetting";

const DeviceModal = ({ device, show, handleClose }) => {
  const [settings, setSettings] = useState({
    brightness: device.brightness || 0,
    temperature: device.temperature || 0,
    motionDetectionEnabled: device.motionDetectionEnabled || false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdateDevice = async () => {
    setLoading(true);
    setError(null);
    try {
      device.temperature =
        settings.temperature > 0 ? settings.temperature : null;
      device.brightness = settings.brightness > 0 ? settings.brightness : null;
      device.motionDetectionEnabled = settings.motionDetectionEnabled
        ? settings.motionDetectionEnabled
        : null;
      await updateDeviceSettings(device.id, device);
    } catch (err) {
      setError("Failed to update device settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Manage {device.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <p>
          <strong>Device Type:</strong> {device.type}
        </p>
        <p>
          <strong>Status:</strong> {device.status ? "On" : "Off"}
        </p>
        <TypeSetting
          device={device}
          settings={settings}
          handleInputChange={handleInputChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleUpdateDevice}
          disabled={loading}
        >
          {loading ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : (
            "Update"
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

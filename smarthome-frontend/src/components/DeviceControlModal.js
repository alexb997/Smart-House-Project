import React, { useState, useEffect } from "react";
import { Modal, Button, Form, ToggleButtonGroup, ToggleButton } from "react-bootstrap";

const DeviceControlModal = ({ show, handleClose, device, handleDeviceUpdate }) => {
  const [formState, setFormState] = useState({
    status: device?.status || "OFF",
    brightness: device?.brightness || 50,
    temperature: device?.temperature || 72,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!show) {
      setFormState({
        status: device?.status || "OFF",
        brightness: device?.brightness || 50,
        temperature: device?.temperature || 72,
      });
      setError(null);
    }
  }, [show, device]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStatusChange = (val) => {
    setFormState((prevState) => ({
      ...prevState,
      status: val,
    }));
  };

  const handleSaveChanges = async () => {
    const { status, brightness, temperature } = formState;

    if (!status) {
      setError("Device status is required.");
      return;
    }

    if (device?.type === "LIGHT" && (brightness < 0 || brightness > 100)) {
      setError("Brightness must be between 0 and 100.");
      return;
    }

    if (device?.type === "THERMOSTAT" && (temperature < 60 || temperature > 90)) {
      setError("Temperature must be between 60 and 90.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await handleDeviceUpdate({ ...device, ...formState });
      handleClose();
    } catch (error) {
      setError("Failed to update device. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{device?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="text-danger mb-3">{error}</div>}

        <p>Current Status: {formState.status}</p>

        <div className="mb-3">
          <ToggleButtonGroup
            type="radio"
            name="status"
            value={formState.status}
            onChange={handleStatusChange}
          >
            <ToggleButton id="tbg-btn-1" value="ON">
              On
            </ToggleButton>
            <ToggleButton id="tbg-btn-2" value="OFF">
              Off
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        {device?.type === "LIGHT" && (
          <Form.Group controlId="brightnessControl" className="mb-3">
            <Form.Label>Brightness</Form.Label>
            <Form.Range
              name="brightness"
              value={formState.brightness}
              onChange={handleChange}
              min="0"
              max="100"
            />
          </Form.Group>
        )}

        {device?.type === "THERMOSTAT" && (
          <Form.Group controlId="temperatureControl" className="mb-3">
            <Form.Label>Temperature</Form.Label>
            <Form.Control
              name="temperature"
              type="number"
              value={formState.temperature}
              onChange={handleChange}
              min="60"
              max="90"
            />
          </Form.Group>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeviceControlModal;

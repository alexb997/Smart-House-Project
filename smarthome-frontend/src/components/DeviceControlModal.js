import React from 'react';
import { Modal, Button, Form, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const DeviceControlModal = ({ show, handleClose, device, handleDeviceUpdate }) => {
  const [status, setStatus] = React.useState(device?.status || "OFF");
  const [brightness, setBrightness] = React.useState(device?.brightness || 50); // Assuming a default value of 50
  const [temperature, setTemperature] = React.useState(device?.temperature || 72); // Assuming a default temperature value for AC

  const handleSaveChanges = () => {
    // Implement logic to update the device settings
    handleDeviceUpdate({ ...device, status, brightness, temperature });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{device?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Device Status Display */}
        <p>Current Status: {status}</p>

        {/* Device Controls */}
        <div className="mb-3">
          <ToggleButtonGroup
            type="radio"
            name="status"
            value={status}
            onChange={(val) => setStatus(val)}
          >
            <ToggleButton id="tbg-btn-1" value="ON">
              On
            </ToggleButton>
            <ToggleButton id="tbg-btn-2" value="OFF">
              Off
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        {/* Brightness Slider (for devices like lights) */}
        {device?.type === 'LIGHT' && (
          <Form.Group controlId="brightnessControl" className="mb-3">
            <Form.Label>Brightness</Form.Label>
            <Form.Range
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
              min="0"
              max="100"
            />
          </Form.Group>
        )}

        {/* Temperature Input (for devices like thermostats) */}
        {device?.type === 'THERMOSTAT' && (
          <Form.Group controlId="temperatureControl" className="mb-3">
            <Form.Label>Temperature</Form.Label>
            <Form.Control
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
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
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeviceControlModal;

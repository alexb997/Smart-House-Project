import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const DeviceControlModal = ({ device, isOpen, onClose }) => {
  const [brightness, setBrightness] = useState(device.brightness);

  const handleToggle = () => {
    alert("toggle")
  };

  const handleBrightnessChange = (event) => {
    alert("brightnessChange")
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{device.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Status: {device.status ? 'On' : 'Off'}</p>

        {device.type === 'LightBulb' && (
          <>
            <Form.Group controlId="brightnessControl">
              <Form.Label>Brightness: {brightness}%</Form.Label>
              <Form.Control
                type="range"
                value={brightness}
                onChange={handleBrightnessChange}
                min="0"
                max="100"
              />
            </Form.Group>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant={device.status ? 'danger' : 'success'} onClick={handleToggle}>
          {device.status ? 'Turn Off' : 'Turn On'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeviceControlModal;
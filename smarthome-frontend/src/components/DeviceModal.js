import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { updateDeviceSettings, controlDevice } from '../service/deviceService';

const DeviceModal = ({ device, show, handleClose }) => {
    const [brightness, setBrightness] = useState(device.brightness || 0);
    const [temperature, setTemperature] = useState(device.temperature || 0);

    const handleBrightnessChange = async (event) => {
        const newValue = event.target.value;
        setBrightness(newValue);
        await updateDeviceSettings(device.deviceId, { brightness: newValue });
    };

    const handleTemperatureChange = async (event) => {
        const newValue = event.target.value;
        setTemperature(newValue);
        await updateDeviceSettings(device.deviceId, { temperature: newValue });
    };

    const handleToggleDevice = async () => {
        await controlDevice(device.deviceId, device.status === 'on' ? 'turnOff' : 'turnOn');
        device.status = device.status === 'on' ? 'off' : 'on'; // Update local state
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{device.type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Status: {device.status}</p>
                {device.type === 'LIGHT' && (
                    <>
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
                    </>
                )}
                {device.type === 'THERMOSTAT' && (
                    <>
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
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleToggleDevice}>
                    {device.status === 'on' ? 'Turn Off' : 'Turn On'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeviceModal;

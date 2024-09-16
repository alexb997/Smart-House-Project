import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createDevice } from '../service/deviceService'; // Add service to create device

const CreateDeviceModal = ({ show, handleClose }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('LIGHT');
    const [status, setStatus] = useState(false);
    const [brightness, setBrightness] = useState(0);
    const [temperature, setTemperature] = useState(0);
    const [error, setError] = useState(null);
    
    const handleSubmit = async () => {
        const newDevice = {
            name,
            type,
            status,
            brightness: type === 'LIGHT' ? brightness : null,
            temperature: type === 'THERMOSTAT' ? temperature : null,
        };

        try {
            await createDevice(newDevice);
            handleClose();
        } catch (error) {
            setError('Failed to create device');
            console.error('Error creating device:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            {error && <div className="error-message">{error}</div>}
            <Modal.Header closeButton>
                <Modal.Title>Create New Device</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="deviceName">
                        <Form.Label>Device Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter device name"
                        />
                    </Form.Group>

                    <Form.Group controlId="deviceType">
                        <Form.Label>Device Type</Form.Label>
                        <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="LIGHT">Light</option>
                            <option value="THERMOSTAT">Thermostat</option>
                            <option value="CAMERA">Camera</option>
                            <option value="DOORBELL">Doorbell</option>
                            <option value="LOCK">Lock</option>
                            <option value="SENSOR">Sensor</option>
                        </Form.Control>
                    </Form.Group>

                    {type === 'LIGHT' && (
                        <Form.Group controlId="deviceBrightness">
                            <Form.Label>Brightness</Form.Label>
                            <Form.Control
                                type="range"
                                min="0"
                                max="100"
                                value={brightness}
                                onChange={(e) => setBrightness(e.target.value)}
                            />
                        </Form.Group>
                    )}

                    {type === 'THERMOSTAT' && (
                        <Form.Group controlId="deviceTemperature">
                            <Form.Label>Temperature</Form.Label>
                            <Form.Control
                                type="number"
                                value={temperature}
                                onChange={(e) => setTemperature(e.target.value)}
                                min="0"
                                max="50"
                            />
                        </Form.Group>
                    )}

                    <Form.Group controlId="deviceStatus">
                        <Form.Check
                            type="checkbox"
                            label="Device On"
                            checked={status}
                            onChange={(e) => setStatus(e.target.checked)}
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

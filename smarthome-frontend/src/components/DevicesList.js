import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Table } from 'react-bootstrap';

const DeviceList = () => {
    const [devices, setDevices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentDevice, setCurrentDevice] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        const response = await axios.get('/api/devices');
        setDevices(response.data);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/devices/${id}`);
        fetchDevices();
    };

    const handleShowModal = (device = {}) => {
        setCurrentDevice(device);
        setIsEditing(!!device.id);
        setShowModal(true);
    };

    const handleSave = async () => {
        if (isEditing) {
            await axios.put(`/api/devices/${currentDevice.id}`, currentDevice);
        } else {
            await axios.post('/api/devices', currentDevice);
        }
        setShowModal(false);
        fetchDevices();
    };

    return (
        <div className="container mt-4">
            <h2>Devices</h2>
            <Button variant="primary" onClick={() => handleShowModal()}>Add Device</Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {devices.map(device => (
                        <tr key={device.id}>
                            <td>{device.id}</td>
                            <td>{device.name}</td>
                            <td>{device.type}</td>
                            <td>{device.status}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleShowModal(device)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(device.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Edit Device' : 'Add Device'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="deviceName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter device name" value={currentDevice.name || ''} onChange={(e) => setCurrentDevice({ ...currentDevice, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="deviceType">
                            <Form.Label>Type</Form.Label>
                            <Form.Control as="select" value={currentDevice.type || ''} onChange={(e) => setCurrentDevice({ ...currentDevice, type: e.target.value })}>
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
                            <Form.Control type="text" placeholder="Enter device status" value={currentDevice.status || ''} onChange={(e) => setCurrentDevice({ ...currentDevice, status: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>{isEditing ? 'Save Changes' : 'Add Device'}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DeviceList;

import React, { useEffect, useState } from 'react';
import DeviceCard from '../components/DeviceCard';
import DeviceModal from '../components/DeviceModal';
import { getDevices } from '../service/deviceService';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';

const Dashboard = () => {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await getDevices();
                setDevices(response.data);
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        };

        fetchDevices();
    }, []);

    const handleOpenModal = (device) => {
        setSelectedDevice(device);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Container>
            <Row>
                {devices.map((device) => (
                    <Col xs={12} sm={6} md={4} key={device.deviceId} className="mb-3">
                        <DeviceCard device={device} onClick={() => handleOpenModal(device)} />
                    </Col>
                ))}
            </Row>
            {selectedDevice && (
                <Modal show={modalOpen} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedDevice.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DeviceModal
                            device={selectedDevice}
                            onClose={handleCloseModal}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
};

export default Dashboard;

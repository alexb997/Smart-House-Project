import React from 'react';
import DeviceCard from './DeviceCard';
import { Container, Row, Col } from 'react-bootstrap';

const DeviceGrid = ({ devices }) => {
    return (
        <Container className="mt-4">
            <Row>
                {devices.map((device) => (
                    <Col key={device.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <DeviceCard device={device} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default DeviceGrid;

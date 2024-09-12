import React from 'react';
import { Card, Button } from 'react-bootstrap';

const DeviceCard = ({ device, onClick }) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{device.type}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Status: {device.status}</Card.Subtitle>
                {device.brightness && <Card.Text>Brightness: {device.brightness}%</Card.Text>}
                {device.temperature && <Card.Text>Temperature: {device.temperature}°C</Card.Text>}
                <Button variant="primary" onClick={onClick}>
                    Manage
                </Button>
            </Card.Body>
        </Card>
    );
};

export default DeviceCard;

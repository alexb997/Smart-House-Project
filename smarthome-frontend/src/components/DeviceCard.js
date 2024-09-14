import React from 'react';
import { Card, Button } from 'react-bootstrap';

const DeviceCard = ({ device, onClick }) => {
    const cardStyle = {
        width: '18rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        marginBottom: '20px',
        overflow: 'hidden',
        transition: 'transform 0.2s ease-in-out',
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'scale(1)';
    };

    return (
        <Card 
            style={cardStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="device-card"
        >
            <Card.Body>
                <Card.Title>{device.name}</Card.Title> {/* Display device name */}
                <Card.Subtitle className="mb-2 text-muted">Type: {device.type}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Status: {device.status ? 'On' : 'Off'}</Card.Subtitle>
                {device.brightness !== null && (
                    <Card.Text>Brightness: {device.brightness}%</Card.Text>
                )}
                {device.temperature !== null && (
                    <Card.Text>Temperature: {device.temperature}°C</Card.Text>
                )}
                {device.motionDetectionEnabled !== null && (
                    <Card.Text>Motion Detection: {device.motionDetectionEnabled ? 'Enabled' : 'Disabled'}</Card.Text>
                )}
                <Button variant="primary" onClick={onClick}>
                    Manage
                </Button>
            </Card.Body>
        </Card>
    );
};

export default DeviceCard;

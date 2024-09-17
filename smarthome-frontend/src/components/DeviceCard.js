import React from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const DeviceCard = ({ device, onClick }) => {
  const cardStyle = {
    width: "18rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    marginBottom: "20px",
    transition: "transform 0.2s",
    cursor: onClick ? "pointer" : "default",
  };

  return (
    <Card
      style={cardStyle}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onClick={onClick}
      className="device-card"
    >
      <Card.Body>
        <Card.Title>{device.name || "Unnamed Device"}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Type: {device.type}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Status: {device.status ? "On" : "Off"}
        </Card.Subtitle>

        {device.brightness !== null && (
          <Card.Text>Brightness: {device.brightness}%</Card.Text>
        )}
        {device.temperature !== null && (
          <Card.Text>Temperature: {device.temperature}°C</Card.Text>
        )}
        {device.motionDetectionEnabled !== null && (
          <Card.Text>
            Motion Detection: {device.motionDetectionEnabled ? "Enabled" : "Disabled"}
          </Card.Text>
        )}

        <Button variant="primary" onClick={onClick} disabled={!onClick}>
          Manage
        </Button>
      </Card.Body>
    </Card>
  );
};

DeviceCard.propTypes = {
  device: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    brightness: PropTypes.number,
    temperature: PropTypes.number,
    motionDetectionEnabled: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func,
};

export default DeviceCard;

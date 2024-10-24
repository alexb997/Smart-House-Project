import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import CustomButton from "./CustomButton";
import DeviceDetails from "./DeviceDetails";

const DeviceCard = ({ device, onClick }) => {
  const cardStyle = {
    backgroundColor: "#C5DBDD",
    borderRadius: "40px",
    marginBottom: "20px",
  };

  return (
    <Card style={cardStyle} onClick={onClick} className="device-card">
      <Card.Body>
        <Card.Title style={{ textAlign: "center" }}>
          {device.name || "Unnamed Device"}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Type: {device.type}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Status: {device.status ? "On" : "Off"}
        </Card.Subtitle>

        <DeviceDetails device={device} />

        <div className="d-flex justify-content-around">
          <CustomButton content="Manage" onClick={onClick}></CustomButton>
          <CustomButton content="Remove" onClick={onClick}></CustomButton>
        </div>
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

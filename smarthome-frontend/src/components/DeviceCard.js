import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import CustomButton from "./CustomButton";
import DeviceDetails from "./DeviceDetails";

const DeviceCard = ({ device, manage, remove }) => {
  const cardStyle = {
    backgroundColor: "#C5DBDD",
    borderRadius: "40px",
    marginBottom: "20px",
  };

  return (
    <Card style={cardStyle} className="device-card">
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
          <CustomButton content="Manage" onClick={manage}></CustomButton>
          <CustomButton content="Remove" onClick={remove}></CustomButton>
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
  }).isRequired,
  manage: PropTypes.func,
  remove: PropTypes.func,
};

export default DeviceCard;

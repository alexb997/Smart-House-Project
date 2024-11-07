import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import CustomButton from "./CustomButton";
import DeviceDetails from "./DeviceDetails";
import { createDeviceLog } from "../service/logService";

const DeviceCard = ({ device, manage, remove }) => {
  const cardStyle = {
    backgroundColor: "#C5DBDD",
    borderRadius: "40px",
    marginBottom: "20px",
  };

  const generateDeviceLog = (deviceType, deviceName, username) => {
    let message;
    let status;
  
    switch (deviceType) {
      case "CAMERA":
        message = "Camera observed movement";
        status = "OBSERVE";
        break;
      case "DOORBELL":
        message = "Doorbell rang";
        status = "RING";
        break;
      case "LOCK":
        message = "Lock engaged or disengaged";
        status = "LOCK";
        break;
      case "SENSOR":
        message = "Sensor detected a change in environment";
        status = "SENSE";
        break;
      default:
        message = "Unknown device activity";
        status = "UNKNOWN";
    }
  
    const log = {
      deviceName: deviceName || "Unnamed Device",
      date: new Date().toISOString(),
      message,
      status,
      username,
    };
  
    console.table(log);
    return log;
  }

  const handleDeviceAction = async (device) => {
    const username = localStorage.getItem("username");
    const log = generateDeviceLog(device.type, device.name, username);
  
    try {
      await createDeviceLog(log);
      console.log("Log created successfully.");
    } catch (error) {
      console.error("Error creating log:", error);
    }
  };

  return (
    <Card style={cardStyle} className="device-card">
      <Card.Body>
        <Card.Title style={{ textAlign: "center" }}>
          {device.name || "Unnamed Device"}
        </Card.Title>
        <Card.Subtitle
          className="mb-2 text-muted"
          onClick={() => handleDeviceAction(device)}
        >
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

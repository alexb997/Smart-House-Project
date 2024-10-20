import React, { useState } from "react";
import { Col, Card, Form } from "react-bootstrap";
import { updateDeviceTemperature } from "../service/deviceService";

function RoomCard({ room, onManage, onListDevices }) {
  const thermometerDevice = room.devices.find(
    (device) => device.type === "THERMOSTAT" && device.temperature !== null
  );

  const [temperature, setTemperature] = useState(
    thermometerDevice ? thermometerDevice.temperature : ""
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  };

  const saveTemperature = async () => {
    try {
      await updateDeviceTemperature(thermometerDevice.id, temperature);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating temperature:", error);
    }
  };

  const handleTemperatureClick = () => {
    if (isEditing) {
      saveTemperature();
    } else {
      setIsEditing(true);
    }
  };

  return (
    <Col md={3} className="mb-4">
      <Card
        style={{
          cursor: "pointer",
          backgroundColor: "#C5DBDD",
          borderRadius: "40px",
        }}
      >
        <Card.Body>
          <Card.Title className="text-center">{room.name}</Card.Title>
          {thermometerDevice ? (
            <>
              <p>Room temperature:</p>
              {isEditing ? (
                <Form.Control
                  type="number"
                  value={temperature}
                  onChange={handleTemperatureChange}
                  min="0"
                  max="50"
                  className="mb-2"
                  onBlur={saveTemperature}
                />
              ) : (
                <p onClick={handleTemperatureClick} style={{ cursor: "pointer" }}>
                  {temperature}°C
                </p>
              )}
            </>
          ) : (
            <p>No temperature sensor available</p>
          )}
        </Card.Body>
        <Card.Body>
          <div className="d-flex justify-content-around">
            <button onClick={onManage}>Manage</button>
            <button onClick={onListDevices}>List Devices</button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default RoomCard;

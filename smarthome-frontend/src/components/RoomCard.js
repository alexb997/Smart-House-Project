import React, { useState } from "react";
import { Col, Card, Form } from "react-bootstrap";
import {
  controlDevice,
  updateDeviceTemperature,
} from "../service/deviceService";

import CustomButton from "./CustomButton";

const deviceTypes = {
  LIGHT: "LIGHT",
  THERMOSTAT: "THERMOSTAT",
  CAMERA: "CAMERA",
  DOORBELL: "DOORBELL",
  LOCK: "LOCK",
  SENSOR: "SENSOR",
};

function RoomCard({ room, onManage, onListDevices }) {
  const thermometerDevice = room.devices.find(
    (device) => device.type === "THERMOSTAT" && device.temperature !== null
  );

  const lightDevice = room.devices.find(
    (device) => device.type === deviceTypes.LIGHT
  );
  const lockDevice = room.devices.find(
    (device) => device.type === deviceTypes.LOCK
  );
  const doorbellDevice = room.devices.find(
    (device) => device.type === deviceTypes.DOORBELL
  );
  const cameraDevice = room.devices.find(
    (device) => device.type === deviceTypes.CAMERA
  );

  const [temperature, setTemperature] = useState(
    thermometerDevice ? thermometerDevice.temperature : ""
  );
  const [lightState, setLightState] = useState(
    lightDevice ? lightDevice.state : false
  );
  const [lockState, setLockState] = useState(
    lockDevice ? lockDevice.state : false
  );

  const [isEditingTemp, setIsEditingTemp] = useState(false);

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

  const toggleLight = async () => {
    try {
      const newLightState = !lightState;
      await controlDevice(lightDevice.id, newLightState);
      setLightState(newLightState);
    } catch (error) {
      console.error("Error toggling light:", error);
    }
  };

  const toggleLock = async () => {
    try {
      const newLockState = !lockState;
      await controlDevice(lockDevice.id, newLockState);
      setLockState(newLockState);
    } catch (error) {
      console.error("Error toggling lock:", error);
    }
  };

  return (
    <Col md={3} className="mb-4">
      <Card
        style={{
          backgroundColor: "#C5DBDD",
          borderRadius: "40px",
        }}
      >
        <Card.Body>
          <Card.Title className="text-center">{room.name}</Card.Title>
          {thermometerDevice ? (
            <>
              <p>
                Room temperature:
                <span>
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
                    <p
                      onClick={handleTemperatureClick}
                      style={{ cursor: "pointer" }}
                    >
                      {temperature}°C
                    </p>
                  )}
                </span>
              </p>
            </>
          ) : (
            <p>No temperature sensor available</p>
          )}
          {lightDevice ? (
            <>
              <p>
                Light:{" "}
                <CustomButton
                  content={lightState ? "On" : "Off"}
                  onClick={toggleLight}
                ></CustomButton>
              </p>
            </>
          ) : (
            <p>No lights available</p>
          )}

          {lockDevice ? (
            <>
              <p>Lock: {lockState ? "Locked" : "Unlocked"}</p>
              <button onClick={toggleLock}>
                {lockState ? "Unlock" : "Lock"}
              </button>
            </>
          ) : (
            <p>No locks available</p>
          )}

          {cameraDevice ? (
            <>
              <p>Camera available</p>
            </>
          ) : (
            <p>No cameras available</p>
          )}

          {doorbellDevice ? (
            <>
              <p>Doorbell available</p>
            </>
          ) : (
            <p>No doorbell available</p>
          )}
        </Card.Body>
        <Card.Body>
          <div className="d-flex justify-content-around">
            <CustomButton content={"Manage"} onClick={onManage} />
            <CustomButton content={"List Devices"} onClick={onListDevices} />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default RoomCard;

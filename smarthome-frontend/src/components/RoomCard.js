import React, { useState } from "react";
import { Col, Card, Form } from "react-bootstrap";
import {
  controlDevice,
  updateDeviceTemperature,  updateDeviceSettings,
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

function RoomCard({ room, onListDevices }) {
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
  const sensorDevice = room.devices.find(
    (device) => device.type === deviceTypes.SENSOR
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
  const [cameraState, setCameraState] = useState(
    cameraDevice ? cameraDevice.state : false
  );
  const [sensorState, setSensorState] = useState(
    sensorDevice ? sensorDevice.state : false
  );

  const [isEditingTemp, setIsEditingTemp] = useState(false);

  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  };

  const saveTemperature = async () => {
    if (thermometerDevice) {
      try {
        await updateDeviceSettings(thermometerDevice.id, { temperature });
        setIsEditingTemp(false);
      } catch (error) {
        console.error("Error updating temperature:", error);
      }
    }
  };

  const handleTemperatureClick = () => {
    if (isEditingTemp) {
      saveTemperature();
    } else {
      setIsEditingTemp(true);
    }
  };

  const toggleDeviceState = async (device, newState, setState) => {
    try {
      await updateDeviceSettings(device.id, { state: newState });
      setState(newState);
    } catch (error) {
      console.error(`Error toggling ${device.type.toLowerCase()}:`, error);
    }
  };

  const toggleLight = () => toggleDeviceState(lightDevice, !lightState, setLightState);
  const toggleLock = () => toggleDeviceState(lockDevice, !lockState, setLockState);
  const toggleCamera = () => toggleDeviceState(cameraDevice, !cameraState, setCameraState);
  const toggleSensor = () => toggleDeviceState(sensorDevice, !sensorState, setSensorState);

  const toggleSecurity = () => {
    if (cameraDevice) toggleCamera();
    if (sensorDevice) toggleSensor();
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
                  {isEditingTemp ? (
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
                  className={"card-button"}
                ></CustomButton>
              </p>
            </>
          ) : (
            <p>No lights available</p>
          )}
          {lockDevice ? (
            <>
              <p>
                Lock: {lockState ? "Locked" : "Unlocked"}{" "}
                <CustomButton
                  content={lockState ? "Unlock" : "Lock"}
                  onClick={toggleLock}
                  className={"card-button"}
                ></CustomButton>
              </p>
            </>
          ) : (
            <p>No locks available</p>
          )}
          {cameraDevice ? (
            <>
              <p>
                Camera: {cameraState ? "Stoped" : "Recording"}{" "}
                <CustomButton
                  content={cameraState ? "Record" : "Stop"}
                  onClick={toggleCamera}
                  className={"card-button"}
                ></CustomButton>
              </p>
            </>
          ) : (
            <p>No cameras available</p>
          )}
          {sensorDevice ? (
            <>
              <p>
                Sensors: {sensorState ? "Off" : "On"}{" "}
                <CustomButton
                  content={sensorState ? "Turn On" : "Turn Off"}
                  onClick={toggleSensor}
                  className={"card-button"}
                ></CustomButton>
              </p>
            </>
          ) : (
            <p>No sensors available</p>
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
            <CustomButton
              content={"Secure"}
              className={"card-button"}
              onClick={toggleSecurity}
            />
            <CustomButton
              content={"List Devices"}
              className={"card-button"}
              onClick={onListDevices}
            />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default RoomCard;

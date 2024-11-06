import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner, Alert } from "react-bootstrap";
import { updateDeviceSettings } from "../service/deviceService";
import PropTypes from "prop-types";
import TypeSetting from "./TypeSetting";
import CustomButton from "./CustomButton";
import { createDeviceLog } from "../service/logService";

const DeviceModal = ({ device, show, handleClose }) => {
  const [settings, setSettings] = useState({
    brightness: device.brightness || null,
    temperature: device.temperature || null,
    status: device.status,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleStatus = () => {
    setSettings((prev) => ({
      ...prev,
      status: !prev.status,
    }));
  };

  const handleUpdateDevice = async () => {
    setLoading(true);
    setError(null);
    const originalDevice = { ...device };
    try {
      let temperature, brightness, status;
      if (settings.temperature > 0) {
        device.temperature = settings.temperature;
        temperature = settings.temperature;
        await updateDeviceSettings(device.id, { temperature });
      } else {
        device.temperature = null;
      }
      if (settings.brightness > 0) {
        device.brightness = settings.brightness;
        brightness = settings.brightness;
        await updateDeviceSettings(device.id, { brightness });
      } else {
        device.brightness = null;
      }
      if (settings.status != device.status) {
        device.status = settings.status;
        status = settings.status;
        await updateDeviceSettings(device.id, { status });
      }

      logDeviceUpdate(originalDevice, settings);
      handleClose();
    } catch (err) {
      setError("Failed to update device settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getChanges = (original, updated) => {
    const changes = [];
    for (const key in updated) {
      if (original[key] !== updated[key]) {
        changes.push({
          field: key,
          oldValue: original[key],
          newValue: updated[key],
        });
      }
    }
    return changes;
  };

  const logDeviceUpdate = async (originalDevice, updatedSettings) => {
    const changes = getChanges(originalDevice, updatedSettings);
    if (changes.length === 0) return;
    const changeMessages = changes
      .map(
        (change) =>
          `Updated ${change.field} from ${change.oldValue ?? "null"} to ${
            change.newValue
          }`
      )
      .join(", ");
    const log = {
      deviceName: device.name,
      date: new Date().toISOString(),
      message: changeMessages,
      status: "Update",
      username: username,
    };

    console.table(log);
    try {
      await createDeviceLog(log);
    } catch (error) {
      console.error("Failed to send log:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header
        style={{
          backgroundColor: "#C5DBDD",
        }}
        closeButton
      >
        <Modal.Title>Manage {device.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "#C5DBDD",
        }}
      >
        {error && <Alert variant="danger">{error}</Alert>}
        <p>
          <strong>Device Type:</strong> {device.type}
        </p>
        <CustomButton
          content={settings.status ? "Turn Off" : "Turn On"}
          onClick={toggleStatus}
        />
        <TypeSetting
          device={device}
          settings={settings}
          handleInputChange={handleInputChange}
        />
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "#C5DBDD",
        }}
      >
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleUpdateDevice}
          disabled={loading}
        >
          {loading ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : (
            "Update"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeviceModal.propTypes = {
  device: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    brightness: PropTypes.number,
    temperature: PropTypes.number,
  }).isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default DeviceModal;

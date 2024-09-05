import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import DeviceControlModal from "../modals/DeviceControlModal";

const DeviceCard = ({ device }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleToggleDevice = () => {
    alert("toggle check");
  };

  return (
    <>
      <Card style={{ width: "18rem" }} className="m-2">
        <Card.Body>
          <Card.Title>{device.name}</Card.Title>
          <Card.Text>Status: {device.status ? "On" : "Off"}</Card.Text>
          <Button
            variant={device.status ? "danger" : "success"}
            onClick={handleToggleDevice}
          >
            {device.status ? "Turn Off" : "Turn On"}
          </Button>
        </Card.Body>
      </Card>

      <DeviceControlModal
        device={device}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default DeviceCard;

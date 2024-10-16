import React from "react";
import CustomButton from "./CustomButton";
import { Col, Card } from "react-bootstrap";

function RoomCard({ room, onManage, onListDevices }) {
  return (
    <Col md={3} key={room.id} className="mb-4">
      <Card
        style={{
          cursor: "pointer",
          backgroundColor: "#C5DBDD",
          borderRadius: "40px",
        }}
      >
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>{room.name}</Card.Title>
          <p>Number of devices: {room.devices.length}</p>
          <p>Room temperature: </p>
        </Card.Body>
        <Card.Body>
          <div className="d-flex justify-content-around">
            <CustomButton content="Manage" onClick={onManage}></CustomButton>
            <CustomButton
              content="List Devices"
              onClick={onListDevices}
            ></CustomButton>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default RoomCard;

import React, { useEffect, useState } from "react";
import instance from "../axios";
import {
  Modal,
  Form,
  Card,
  Container,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import RoomCard from "./RoomCard";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRoom, setCurrentRoom] = useState({ name: "" });
  const [isEditing, setIsEditing] = useState(false);
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms(userId);
  }, [userId]);

  const fetchRooms = async (userId) => {
    try {
      const response = await instance.get(`/api/rooms/user/${userId}`);
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await instance.delete(`/api/rooms/${id}`);
      fetchRooms(userId);
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleShowModal = (room = { name: "" }) => {
    setCurrentRoom(room);
    setIsEditing(!!room.id);
    setShowModal(true);
  };

  const handleSave = async (userId) => {
    try {
      const roomData = {
        name: currentRoom.name,
        userId: userId,
      };

      if (isEditing) {
        await instance.put(`/api/rooms/${currentRoom.id}`, roomData);
      } else {
        await instance.post("/api/rooms", currentRoom);
      }

      fetchRooms();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  const onListDevices = (roomName, roomId) => {
    navigate(`/${roomName}/devices`, { state: { roomId } });
  };

  const onManage = (roomName, roomId) => {
    navigate(`/${roomName}/devices`, { state: { roomId } });
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentRoom({ name: "" });
  };

  return (
    <Container className="mt-4">
      <h2 style={{ color: "white" }} className=" text-center mb-4">
        Rooms
      </h2>
      <CustomButton
        content="+ Add Room"
        onClick={() => handleShowModal()}
      ></CustomButton>
      <p></p>
      <Row>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <RoomCard
              room={room}
              onManage={() => onManage(room.name, room.id)}
              onListDevices={() => onListDevices(room.name, room.id)}
            ></RoomCard>
          ))
        ) : (
          <Col>
            <h4>No rooms available!</h4>
          </Col>
        )}
      </Row>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Room" : "Add Room"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="roomName">
              <Form.Label>Room Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter room name"
                value={currentRoom.name || ""}
                onChange={(e) =>
                  setCurrentRoom({ ...currentRoom, name: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {isEditing ? "Save Changes" : "Add Room"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RoomList;

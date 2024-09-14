import React, { useEffect, useState } from "react";
import instance from "../axios";
import {
  Button,
  Modal,
  Form,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRoom, setCurrentRoom] = useState({ name: "" }); // Default to an empty room
  const [isEditing, setIsEditing] = useState(false);
  
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await instance.get("/api/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await instance.delete(`/api/rooms/${id}`);
      fetchRooms();
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleShowModal = (room = { name: "" }) => {
    setCurrentRoom(room);
    setIsEditing(!!room.id);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await instance.put(`/api/rooms/${currentRoom.id}`, currentRoom);
      } else {
        await instance.post("/api/rooms", currentRoom);
      }
      fetchRooms();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentRoom({ name: "" });
  };

  const handleRoomClick = (roomName,roomId) => {
    navigate(`/${roomName}/devices`, { state: { roomId: roomId } });
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Rooms</h2>
      <Button
        variant="primary"
        className="mb-3"
        onClick={() => handleShowModal()}
      >
        Add Room
      </Button>
      <Row>
        {rooms.map((room) => (
          <Col md={4} key={room.id} className="mb-4">
            <Card onClick={() => handleRoomClick(room.name,room.id)} style={{ cursor: 'pointer' }}>
              <Card.Body>
                <Card.Title>{room.name}</Card.Title>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="warning"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowModal(room);
                    }}
                  >
                    <FaEdit /> Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(room.id);
                    }}
                  >
                    <FaTrash /> Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
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
          <Button variant="secondary" onClick={handleCloseModal}>
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

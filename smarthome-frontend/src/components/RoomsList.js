import React, { useEffect, useState } from 'react';
import instance from '../axios';
import { Button, Modal, Form, Card, Container, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons for better UI

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentRoom, setCurrentRoom] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        const response = await instance.get('/api/rooms');
        setRooms(response.data);
    };

    const handleDelete = async (id) => {
        await instance.delete(`/api/rooms/${id}`);
        fetchRooms();
    };

    const handleShowModal = (room = {}) => {
        setCurrentRoom(room);
        setIsEditing(!!room.id);
        setShowModal(true);
    };

    const handleSave = async () => {
        if (isEditing) {
            await instance.put(`/api/rooms/${currentRoom.id}`, currentRoom);
        } else {
            await instance.post('/api/rooms', currentRoom);
        }
        setShowModal(false);
        fetchRooms();
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4 text-center">Rooms</h2>
            <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>Add Room</Button>
            <Row>
                {rooms.map(room => (
                    <Col md={4} key={room.id} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{room.name}</Card.Title>
                                <div className="d-flex justify-content-between">
                                    <Button variant="warning" onClick={() => handleShowModal(room)}>
                                        <FaEdit /> Edit
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(room.id)}>
                                        <FaTrash /> Delete
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Edit Room' : 'Add Room'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="roomName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter room name"
                                value={currentRoom.name || ''}
                                onChange={(e) => setCurrentRoom({ ...currentRoom, name: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>{isEditing ? 'Save Changes' : 'Add Room'}</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default RoomList;

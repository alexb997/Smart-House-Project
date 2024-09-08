import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Table } from 'react-bootstrap';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentRoom, setCurrentRoom] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        const response = await axios.get('/api/rooms');
        setRooms(response.data);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/rooms/${id}`);
        fetchRooms();
    };

    const handleShowModal = (room = {}) => {
        setCurrentRoom(room);
        setIsEditing(!!room.id);
        setShowModal(true);
    };

    const handleSave = async () => {
        if (isEditing) {
            await axios.put(`/api/rooms/${currentRoom.id}`, currentRoom);
        } else {
            await axios.post('/api/rooms', currentRoom);
        }
        setShowModal(false);
        fetchRooms();
    };

    return (
        <div className="container mt-4">
            <h2>Rooms</h2>
            <Button variant="primary" onClick={() => handleShowModal()}>Add Room</Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room => (
                        <tr key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.name}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleShowModal(room)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(room.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Edit Room' : 'Add Room'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="roomName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter room name" value={currentRoom.name || ''} onChange={(e) => setCurrentRoom({ ...currentRoom, name: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>{isEditing ? 'Save Changes' : 'Add Room'}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RoomList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Table } from 'react-bootstrap';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get('/api/users');
        setUsers(response.data);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/users/${id}`);
        fetchUsers();
    };

    const handleShowModal = (user = {}) => {
        setCurrentUser(user);
        setIsEditing(!!user.id);
        setShowModal(true);
    };

    const handleSave = async () => {
        if (isEditing) {
            await axios.put(`/api/users/${currentUser.id}`, currentUser);
        } else {
            await axios.post('/api/users', currentUser);
        }
        setShowModal(false);
        fetchUsers();
    };

    return (
        <div className="container mt-4">
            <h2>Users</h2>
            <Button variant="primary" onClick={() => handleShowModal()}>Add User</Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleShowModal(user)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Edit User' : 'Add User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" value={currentUser.username || ''} onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={currentUser.email || ''} onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" value={currentUser.password || ''} onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>{isEditing ? 'Save Changes' : 'Add User'}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserList;

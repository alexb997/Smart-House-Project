import React, { useState } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import { createUser } from "../service/userService";

const UserForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = { username, password };
      await createUser(user);
      setMessage("User created successfully!");
      setUsername("");
      setPassword("");
      setError(false);
    } catch (err) {
      setMessage("Error creating user.");
      setError(true);
      console.error("Error creating user:", err);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Create New User</h2>
      {message && (
        <Alert variant={error ? "danger" : "success"}>{message}</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Create User
        </Button>
      </Form>
    </Container>
  );
};

export default UserForm;

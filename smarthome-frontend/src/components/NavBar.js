import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const NavbarComponent = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/login");
  };

  return (
    <Navbar expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} className="brand" to="/">
          Smart Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/logs">
              Device Logs
            </Nav.Link>
            <Nav.Link as={Link} to="/settings">
              System Settings
            </Nav.Link>
            <Nav.Link as={Link} to="/rooms">
              Rooms
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {username ? (
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="outline-primary" as={Link} to="/login">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;

import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import CustomButton from "./CustomButton";

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

  const handleLogin = () => {
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
            <Nav.Link className="custom-nav-link" as={Link} to="/">
              Dashboard
            </Nav.Link>
            <Nav.Link className="custom-nav-link" as={Link} to="/logs">
              Device Logs
            </Nav.Link>
            <Nav.Link className="custom-nav-link" as={Link} to="/settings">
              System Settings
            </Nav.Link>
            <Nav.Link className="custom-nav-link" as={Link} to="/rooms">
              Rooms
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {username ? (
              <CustomButton
                content={"Logout"}
                onClick={handleLogout}
                className="customLogin"
              >
                Logout
              </CustomButton>
            ) : (
              <CustomButton
                content={"Login"}
                onClick={handleLogin}
                className="customLogin"
              >
                Login
              </CustomButton>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;

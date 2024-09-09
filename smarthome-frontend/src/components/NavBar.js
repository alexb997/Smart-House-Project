import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';

const Navbar = () => {
    return (
        <BootstrapNavbar bg="dark" variant="dark" expand="lg">
            <Container>
                <BootstrapNavbar.Brand href="/">SmartHome Dashboard</BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/devices">Devices</Nav.Link>
                        <Nav.Link href="/logs">Device Logs</Nav.Link>
                        <Nav.Link href="/settings">Settings</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href="/logout">Logout</Nav.Link>
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;

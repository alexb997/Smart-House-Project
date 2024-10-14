import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="bg-light py-3 mt-4">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              © {new Date().getFullYear()} Smart Home Automation System
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

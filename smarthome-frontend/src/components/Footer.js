import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-light py-3 mt-4">
            <Container>
                <Row>
                    <Col className="text-center">
                        <p className="mb-0">© {new Date().getFullYear()} Smart Home Automation System</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

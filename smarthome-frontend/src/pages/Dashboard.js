import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DeviceCard from "../components/DeviceCard";
import AppNavbar from "../components/NavBar";
import { getDevices } from "../service/api";

const Dashboard = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const devicesData = await getDevices();
        setDevices(devicesData);
      } catch (error) {
        console.error("Failed to fetch devices:", error);
      }
    };

    fetchDevices();
  }, []);

  return (
    <>
      <AppNavbar />
      <Container className="my-4">
        <Row>
          {devices.map((device) => (
            <Col key={device.id} md={4}>
              <DeviceCard device={device} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;

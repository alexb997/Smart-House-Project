import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getDeviceLogs } from "../service/deviceService";

const DeviceLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getDeviceLogs();
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Device Name</th>
          <th>Action</th>
          <th>Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, index) => (
          <tr key={index}>
            <td>{log.deviceName}</td>
            <td>{log.action}</td>
            <td>{log.time}</td>
            <td>{log.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DeviceLogs;

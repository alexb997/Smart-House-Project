import React, { useEffect, useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import { getDeviceLogs } from "../service/logService";

const DeviceLogs = () => {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const username = localStorage.getItem("username");

  const fetchLogs = async (page, size) => {
    try {
      const response = await getDeviceLogs(username, page, size);
      setLogs(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    fetchLogs(page, size);
  }, [page, size]);

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <>
      <Table className="m-4" striped bordered hover>
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
              <td>{log.message}</td>
              <td>{log.date}</td>
              <td>{log.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={handlePrevPage} disabled={page === 0} />
        <Pagination.Item active>{page + 1}</Pagination.Item>
        <Pagination.Next
          onClick={handleNextPage}
          disabled={page === totalPages - 1}
        />
      </Pagination>
    </>
  );
};

export default DeviceLogs;

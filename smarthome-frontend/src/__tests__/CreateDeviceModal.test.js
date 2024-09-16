import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import CreateDeviceModal from "../components/CreateDeviceModal";

jest.mock("axios");

describe("CreateDeviceModal Component", () => {
  const mockHandleClose = jest.fn();

  beforeEach(() => {
    axios.post.mockClear();
  });

  test("renders modal and submits form", async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    render(<CreateDeviceModal show={true} handleClose={mockHandleClose} />);

    const nameInput = screen.getByLabelText(/Device Name/i);
    const typeSelect = screen.getByLabelText(/Device Type/i);
    const statusCheckbox = screen.getByLabelText(/Device On/i);
    const createButton = screen.getByText(/Create Device/i);

    fireEvent.change(nameInput, { target: { value: "New Device" } });
    fireEvent.change(typeSelect, { target: { value: "LIGHT" } });
    fireEvent.click(statusCheckbox);

    fireEvent.click(createButton);

    expect(axios.post).toHaveBeenCalledWith("/devices", {
      name: "New Device",
      type: "LIGHT",
      status: true,
      brightness: 0,
      temperature: null,
    });

    expect(mockHandleClose).toHaveBeenCalled();
  });

  test("shows error message on axios failure", async () => {
    axios.post.mockRejectedValueOnce(new Error("Failed to create device"));

    render(<CreateDeviceModal show={true} handleClose={mockHandleClose} />);

    const nameInput = screen.getByLabelText(/Device Name/i);
    const createButton = screen.getByText(/Create Device/i);

    fireEvent.change(nameInput, { target: { value: "New Device" } });

    fireEvent.click(createButton);

    expect(axios.post).toHaveBeenCalled();

    const errorMessage = await screen.findByText(/Failed to create device/i);
    expect(errorMessage).toBeInTheDocument();
  });
});

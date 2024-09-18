import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createDevice } from "../service/deviceService";
import CreateDeviceModal from "../components/CreateDeviceModal";

jest.mock("../service/deviceService");

describe("CreateDeviceModal Component", () => {
  const mockHandleClose = jest.fn();
  const roomId = "room1";
  const userId = "user1";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders modal and submits form successfully", async () => {
    createDevice.mockResolvedValueOnce({ data: { success: true } });

    render(<CreateDeviceModal show={true} handleClose={mockHandleClose} roomId={roomId} userId={userId} />);

    const nameInput = screen.getByLabelText(/Device Name/i);
    const typeSelect = screen.getByLabelText(/Device Type/i);
    const statusCheckbox = screen.getByLabelText(/Device On/i);
    const createButton = screen.getByText(/Create Device/i);

    fireEvent.change(nameInput, { target: { value: "New Device" } });
    fireEvent.change(typeSelect, { target: { value: "LIGHT" } });
    fireEvent.click(statusCheckbox);

    fireEvent.click(createButton);

    expect(createDevice).toHaveBeenCalledWith({
      device: {
        name: "New Device",
        type: "LIGHT",
        status: true,
        brightness: 0,
        temperature: null,
      },
      roomId: roomId,
      userId: userId,
    });

    expect(mockHandleClose).toHaveBeenCalled();
  });

  test("shows error message on device creation failure", async () => {
    createDevice.mockRejectedValueOnce(new Error("Failed to create device"));

    render(<CreateDeviceModal show={true} handleClose={mockHandleClose} roomId={roomId} userId={userId} />);

    const nameInput = screen.getByLabelText(/Device Name/i);
    const createButton = screen.getByText(/Create Device/i);

    fireEvent.change(nameInput, { target: { value: "New Device" } });

    fireEvent.click(createButton);

    await waitFor(() => {
      expect(createDevice).toHaveBeenCalled();
      const errorMessage = screen.getByText(/Failed to create device/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("displays brightness slider when LIGHT type is selected", () => {
    render(<CreateDeviceModal show={true} handleClose={mockHandleClose} roomId={roomId} userId={userId} />);

    const typeSelect = screen.getByLabelText(/Device Type/i);

    fireEvent.change(typeSelect, { target: { value: "LIGHT" } });

    expect(screen.getByLabelText(/Brightness/i)).toBeInTheDocument();
  });

  test("displays temperature input when THERMOSTAT type is selected", () => {
    render(<CreateDeviceModal show={true} handleClose={mockHandleClose} roomId={roomId} userId={userId} />);

    const typeSelect = screen.getByLabelText(/Device Type/i);

    fireEvent.change(typeSelect, { target: { value: "THERMOSTAT" } });

    expect(screen.getByLabelText(/Temperature/i)).toBeInTheDocument();
  });
});

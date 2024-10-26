import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeviceModal from "./DeviceModal";
import { updateDeviceSettings } from "../service/deviceService";
import '@testing-library/jest-dom/extend-expect';

jest.mock("../service/deviceService", () => ({
  updateDeviceSettings: jest.fn(),
}));

const mockDevice = {
  id: 1,
  name: "Test Device",
  type: "Sensor",
  status: true,
  brightness: 50,
  temperature: 20,
  motionDetectionEnabled: true,
};

describe("DeviceModal", () => {
  const handleClose = jest.fn();

  test("renders device information correctly", () => {
    render(<DeviceModal device={mockDevice} show={true} handleClose={handleClose} />);
    
    expect(screen.getByText("Manage Test Device")).toBeInTheDocument();
    expect(screen.getByText("Device Type: Sensor")).toBeInTheDocument();
    expect(screen.getByText("Turn Off")).toBeInTheDocument();  // Status button text
  });

  test("toggles device status when the button is clicked", () => {
    render(<DeviceModal device={mockDevice} show={true} handleClose={handleClose} />);
    
    const toggleButton = screen.getByText("Turn Off");
    fireEvent.click(toggleButton);
    expect(toggleButton.textContent).toBe("Turn On");
    
    fireEvent.click(toggleButton);
    expect(toggleButton.textContent).toBe("Turn Off");
  });

  test("updates input values when changed", () => {
    render(<DeviceModal device={mockDevice} show={true} handleClose={handleClose} />);
    
    const brightnessInput = screen.getByLabelText(/brightness/i);
    fireEvent.change(brightnessInput, { target: { value: 80 } });
    expect(brightnessInput.value).toBe("80");

    const temperatureInput = screen.getByLabelText(/temperature/i);
    fireEvent.change(temperatureInput, { target: { value: 25 } });
    expect(temperatureInput.value).toBe("25");
  });

  test("displays error alert when update fails", async () => {
    updateDeviceSettings.mockRejectedValueOnce(new Error("Update failed"));
    render(<DeviceModal device={mockDevice} show={true} handleClose={handleClose} />);
    
    const updateButton = screen.getByText("Update");
    fireEvent.click(updateButton);
    
    await waitFor(() => {
      expect(screen.getByText("Failed to update device settings. Please try again.")).toBeInTheDocument();
    });
  });

  test("calls updateDeviceSettings with correct data on update", async () => {
    updateDeviceSettings.mockResolvedValueOnce({});
    render(<DeviceModal device={mockDevice} show={true} handleClose={handleClose} />);

    const updateButton = screen.getByText("Update");
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(updateDeviceSettings).toHaveBeenCalledWith(1, {
        ...mockDevice,
        status: true,
        brightness: 50,
        temperature: 20,
        motionDetectionEnabled: true,
      });
    });
  });
});

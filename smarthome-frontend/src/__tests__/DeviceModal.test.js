import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeviceModal from "../components/DeviceModal";
import { updateDeviceSettings } from "../service/deviceService";

jest.mock("../service/deviceService");

describe("DeviceModal Component", () => {
  const device = {
    id: 1,
    name: "Living Room Light",
    type: "LIGHT",
    status: true,
    brightness: 75,
    temperature: null,
    motionDetectionEnabled: null,
  };

  const mockHandleClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders modal with device information", () => {
    render(
      <DeviceModal device={device} show={true} handleClose={mockHandleClose} />
    );

    expect(screen.getByText(/Manage Living Room Light/i)).toBeInTheDocument();
    expect(screen.getByText(/Device Type:/i)).toHaveTextContent(
      "Device Type: LIGHT"
    );
    expect(screen.getByText(/Status:/i)).toHaveTextContent("Status: On");
    expect(screen.getByLabelText(/Brightness:/i)).toHaveValue(75);
  });

  test("updates brightness value on input change", () => {
    render(
      <DeviceModal device={device} show={true} handleClose={mockHandleClose} />
    );

    const brightnessInput = screen.getByLabelText(/Brightness:/i);
    fireEvent.change(brightnessInput, { target: { value: 50 } });

    expect(brightnessInput).toHaveValue(50);
  });

  test("calls updateDeviceSettings on button click", async () => {
    updateDeviceSettings.mockResolvedValueOnce({ data: {} });

    render(
      <DeviceModal device={device} show={true} handleClose={mockHandleClose} />
    );

    const manageButton = screen.getByText(/Turn Off/i);
    fireEvent.click(manageButton);

    await waitFor(() =>
      expect(updateDeviceSettings).toHaveBeenCalledWith(1, { status: false })
    );
  });

  test("shows error message on update failure", async () => {
    updateDeviceSettings.mockRejectedValueOnce(new Error("Update failed"));

    render(
      <DeviceModal device={device} show={true} handleClose={mockHandleClose} />
    );

    const manageButton = screen.getByText(/Turn Off/i);
    fireEvent.click(manageButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Failed to update device settings. Please try again./i)
      ).toBeInTheDocument();
    });
  });
});

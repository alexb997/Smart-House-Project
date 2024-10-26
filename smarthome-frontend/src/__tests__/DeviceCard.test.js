import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeviceCard from "./DeviceCard";
import CustomButton from "../components/CustomButton";
import DeviceDetails from "../components/DeviceDetails";

const mockDevice = {
  name: "Living Room Light",
  type: "Light",
  status: true,
  brightness: 70,
  temperature: 25,
  motionDetectionEnabled: false,
};

describe("DeviceCard", () => {
  test("renders device information correctly", () => {
    render(<DeviceCard device={mockDevice} onClick={() => {}} />);

    expect(screen.getByText("Living Room Light")).toBeInTheDocument();
    expect(screen.getByText("Type: Light")).toBeInTheDocument();
    expect(screen.getByText("Status: On")).toBeInTheDocument();
  });

  test("renders default name when device name is missing", () => {
    const deviceWithoutName = { ...mockDevice, name: "" };
    render(<DeviceCard device={deviceWithoutName} onClick={() => {}} />);

    expect(screen.getByText("Unnamed Device")).toBeInTheDocument();
  });

  test("calls onClick handler when Manage button is clicked", () => {
    const handleClick = jest.fn();
    render(<DeviceCard device={mockDevice} onClick={handleClick} />);

    const manageButton = screen.getByText("Manage");
    fireEvent.click(manageButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("calls onClick handler when Remove button is clicked", () => {
    const handleClick = jest.fn();
    render(<DeviceCard device={mockDevice} onClick={handleClick} />);

    const removeButton = screen.getByText("Remove");
    fireEvent.click(removeButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("displays DeviceDetails component", () => {
    render(<DeviceCard device={mockDevice} onClick={() => {}} />);
    expect(screen.getByText("Device Details")).toBeInTheDocument();
  });
});

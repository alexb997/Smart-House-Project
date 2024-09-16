import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeviceCard from "../components/DeviceCard";

const mockDevice = {
  id: 1,
  name: "Living Room Light",
  type: "Light",
  status: true,
  brightness: 75,
  temperature: null,
  motionDetectionEnabled: false,
};

describe("DeviceCard Component", () => {
  test("renders the device card with proper data", () => {
    render(<DeviceCard device={mockDevice} />);

    expect(screen.getByText("Living Room Light")).toBeInTheDocument();
    expect(screen.getByText(/Type: Light/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: On/i)).toBeInTheDocument();
    expect(screen.getByText(/Brightness: 75%/i)).toBeInTheDocument();

    expect(screen.queryByText(/Temperature:/i)).not.toBeInTheDocument();
  });

  test("shows 'Unnamed Device' when device name is missing", () => {
    const deviceWithoutName = { ...mockDevice, name: null };
    render(<DeviceCard device={deviceWithoutName} />);

    expect(screen.getByText("Unnamed Device")).toBeInTheDocument();
  });

  test("button click triggers onClick handler", () => {
    const handleClick = jest.fn();
    render(<DeviceCard device={mockDevice} onClick={handleClick} />);

    const button = screen.getByText(/Manage/i);

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(2);//toCheck
  });

  test("hover effect changes scale of the card", () => {
    render(<DeviceCard device={mockDevice} />);

    const card = screen.getByText(/Living Room Light/i).closest(".device-card");

    fireEvent.mouseEnter(card);
    expect(card).toHaveStyle("transform: scale(1.05)");

    fireEvent.mouseLeave(card);
    expect(card).toHaveStyle("transform: scale(1)");
  });

  test("button is disabled if no onClick handler is provided", () => {
    render(<DeviceCard device={mockDevice} />);

    const button = screen.getByText(/Manage/i);

    expect(button).toBeDisabled();
  });
});

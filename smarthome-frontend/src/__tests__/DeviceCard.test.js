import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeviceCard from "../components/DeviceCard";

describe("DeviceCard Component", () => {
  const device = {
    id: 1,
    name: "Living Room Light",
    type: "LIGHT",
    status: true,
    brightness: 75,
    temperature: null,
    motionDetectionEnabled: null,
  };

  test("renders device card with correct information", () => {
    render(<DeviceCard device={device} />);

    expect(screen.getByText("Living Room Light")).toBeInTheDocument();
    expect(screen.getByText("Type: LIGHT")).toBeInTheDocument();
    expect(screen.getByText("Status: On")).toBeInTheDocument();
    expect(screen.getByText("Brightness: 75%")).toBeInTheDocument();
  });

  test("calls onClick when card is clicked", () => {
    const handleClick = jest.fn();
    render(<DeviceCard device={device} onClick={handleClick} />);

    fireEvent.click(screen.getByText("Manage"));
    expect(handleClick).toHaveBeenCalled();
  });

  test("does not call onClick when there is no onClick handler", () => {
    const { container } = render(<DeviceCard device={device} />);
    
    fireEvent.click(container.firstChild);
    expect(container.firstChild).toHaveStyle("cursor: default");
  });
});

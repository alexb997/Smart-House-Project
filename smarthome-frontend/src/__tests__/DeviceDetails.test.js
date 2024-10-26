import React from "react";
import { render, screen } from "@testing-library/react";
import DeviceDetails from "./DeviceDetails";

describe("DeviceDetails", () => {
  test("displays brightness when device has a brightness value", () => {
    const device = { brightness: 80 };
    render(<DeviceDetails device={device} />);

    expect(screen.getByText("Brightness: 80%")).toBeInTheDocument();
  });

  test("displays temperature when device has a temperature value and no brightness", () => {
    const device = { temperature: 22 };
    render(<DeviceDetails device={device} />);

    expect(screen.getByText("Temperature: 22°C")).toBeInTheDocument();
  });

  test("displays motion detection status when device has neither brightness nor temperature", () => {
    const device = { motionDetectionEnabled: true };
    render(<DeviceDetails device={device} />);

    expect(screen.getByText("Motion Detection: Enabled")).toBeInTheDocument();
  });

  test("displays motion detection as Disabled when motionDetectionEnabled is false", () => {
    const device = { motionDetectionEnabled: false };
    render(<DeviceDetails device={device} />);

    expect(screen.getByText("Motion Detection: Disabled")).toBeInTheDocument();
  });
});

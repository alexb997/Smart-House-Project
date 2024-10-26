import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RoomCard from "./RoomCard";
import {
  controlDevice,
  updateDeviceTemperature,
} from "../service/deviceService";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../service/deviceService", () => ({
  controlDevice: jest.fn(),
  updateDeviceTemperature: jest.fn(),
}));

const mockRoom = {
  name: "Living Room",
  devices: [
    { id: 1, type: "THERMOSTAT", temperature: 22 },
    { id: 2, type: "LIGHT", state: true },
    { id: 3, type: "LOCK", state: false },
    { id: 4, type: "CAMERA" },
    { id: 5, type: "DOORBELL" },
  ],
};

describe("RoomCard", () => {
  test("renders room name and devices", () => {
    render(
      <RoomCard room={mockRoom} onManage={() => {}} onListDevices={() => {}} />
    );

    expect(screen.getByText("Living Room")).toBeInTheDocument();
    expect(screen.getByText("Room temperature:")).toBeInTheDocument();
    expect(screen.getByText("22°C")).toBeInTheDocument();
    expect(screen.getByText("Light:")).toBeInTheDocument();
    expect(screen.getByText("On")).toBeInTheDocument(); // Light button text
    expect(screen.getByText("Lock: Unlocked")).toBeInTheDocument();
    expect(screen.getByText("Camera available")).toBeInTheDocument();
    expect(screen.getByText("Doorbell available")).toBeInTheDocument();
  });

  test("allows toggling light state", async () => {
    render(
      <RoomCard room={mockRoom} onManage={() => {}} onListDevices={() => {}} />
    );

    const lightButton = screen.getByText("On");
    fireEvent.click(lightButton);
    expect(controlDevice).toHaveBeenCalledWith(2, false); // Mock function checks

    await waitFor(() => {
      expect(lightButton.textContent).toBe("Off");
    });
  });

  test("allows toggling lock state", async () => {
    render(
      <RoomCard room={mockRoom} onManage={() => {}} onListDevices={() => {}} />
    );

    const lockButton = screen.getByText("Unlock");
    fireEvent.click(lockButton);
    expect(controlDevice).toHaveBeenCalledWith(3, true); // Mock function checks

    await waitFor(() => {
      expect(lockButton.textContent).toBe("Lock");
    });
  });

  test("allows editing and saving temperature", async () => {
    render(
      <RoomCard room={mockRoom} onManage={() => {}} onListDevices={() => {}} />
    );

    const temperatureText = screen.getByText("22°C");
    fireEvent.click(temperatureText);

    const temperatureInput = screen.getByDisplayValue("22");
    fireEvent.change(temperatureInput, { target: { value: "25" } });

    fireEvent.blur(temperatureInput);
    await waitFor(() => {
      expect(updateDeviceTemperature).toHaveBeenCalledWith(1, "25"); // Mock function checks
    });
  });

  test("displays 'No temperature sensor available' when no thermostat device", () => {
    const mockRoomWithoutThermostat = {
      ...mockRoom,
      devices: mockRoom.devices.filter((d) => d.type !== "THERMOSTAT"),
    };
    render(
      <RoomCard
        room={mockRoomWithoutThermostat}
        onManage={() => {}}
        onListDevices={() => {}}
      />
    );

    expect(
      screen.getByText("No temperature sensor available")
    ).toBeInTheDocument();
  });

  test("displays 'No lights available' when no light device", () => {
    const mockRoomWithoutLight = {
      ...mockRoom,
      devices: mockRoom.devices.filter((d) => d.type !== "LIGHT"),
    };
    render(
      <RoomCard
        room={mockRoomWithoutLight}
        onManage={() => {}}
        onListDevices={() => {}}
      />
    );

    expect(screen.getByText("No lights available")).toBeInTheDocument();
  });

  test("displays 'No locks available' when no lock device", () => {
    const mockRoomWithoutLock = {
      ...mockRoom,
      devices: mockRoom.devices.filter((d) => d.type !== "LOCK"),
    };
    render(
      <RoomCard
        room={mockRoomWithoutLock}
        onManage={() => {}}
        onListDevices={() => {}}
      />
    );

    expect(screen.getByText("No locks available")).toBeInTheDocument();
  });
});

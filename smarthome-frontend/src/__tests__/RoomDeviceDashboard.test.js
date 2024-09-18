import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RoomDeviceDashboard from "../components/RoomDeviceDashboard";
import { getRoomDevices } from "../service/roomService";
import { MemoryRouter, Routes, Route } from "react-router-dom";

jest.mock("../service/roomService");

describe("RoomDeviceDashboard Component", () => {
  const mockDevices = [
    { id: 1, name: "Smart Bulb", type: "LIGHT", status: true },
    { id: 2, name: "Thermostat", type: "THERMOSTAT", status: false },
  ];

  beforeEach(() => {
    getRoomDevices.mockResolvedValueOnce({ data: mockDevices });
    localStorage.setItem("userId", "1");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetches and displays devices", async () => {
    render(
      <MemoryRouter initialEntries={["/Living Room/devices"]}>
        <Routes>
          <Route path="/:roomName/devices" element={<RoomDeviceDashboard />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("Smart Bulb")).toBeInTheDocument();
    expect(await screen.findByText("Thermostat")).toBeInTheDocument();
  });

  test("opens Create Device modal", async () => {
    render(
      <MemoryRouter initialEntries={["/Living Room/devices"]}>
        <Routes>
          <Route path="/:roomName/devices" element={<RoomDeviceDashboard />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Create New Device"));
    expect(screen.getByText("Create New Device")).toBeInTheDocument();
  });

  test("opens DeviceModal on device card click", async () => {
    render(
      <MemoryRouter initialEntries={["/Living Room/devices"]}>
        <Routes>
          <Route path="/:roomName/devices" element={<RoomDeviceDashboard />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(await screen.findByText("Smart Bulb"));
    expect(screen.getByText("Manage Smart Bulb")).toBeInTheDocument();
  });
});

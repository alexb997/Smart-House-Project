import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import RoomDeviceDashboard from "../components/RoomDeviceDashboard";
import { getRoomDevices } from "../service/roomService";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../service/roomService");

describe("RoomDeviceDashboard Component", () => {
  const mockDevices = [
    { id: 1, name: "Light Device", type: "LIGHT", status: true },
    { id: 2, name: "Thermostat Device", type: "THERMOSTAT", status: false },
  ];

  it("should fetch and display devices in the room", async () => {
    getRoomDevices.mockResolvedValueOnce({ data: mockDevices });

    render(
      <MemoryRouter>
        <RoomDeviceDashboard />
      </MemoryRouter>
    );

    await waitFor(() => expect(getRoomDevices).toHaveBeenCalledTimes(1));

    expect(screen.getByText("Light Device")).toBeInTheDocument();
    expect(screen.getByText("Thermostat Device")).toBeInTheDocument();
  });

  it("should display error message on fetching failure", async () => {
    getRoomDevices.mockRejectedValueOnce(new Error("Failed to fetch devices"));

    render(
      <MemoryRouter>
        <RoomDeviceDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Light Device")).not.toBeInTheDocument();
    });

    expect(screen.queryByText("Failed to fetch devices")).toBeTruthy();
  });
});

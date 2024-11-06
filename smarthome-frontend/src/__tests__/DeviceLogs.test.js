import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeviceLogs from "./DeviceLogs";
import { getDeviceLogs } from "../service/logService";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../service/logService", () => ({
  getDeviceLogs: jest.fn(),
}));

const mockLogs = [
  {
    deviceName: "Thermostat",
    message: "Set to 22°C",
    date: "2024-11-06T17:39:25.538Z",
    status: "UPDATE",
  },
  {
    deviceName: "Light",
    message: "Turned On",
    date: "2024-11-06T17:39:25.538Z",
    status: "UPDATE",
  },
  {
    deviceName: "Lock",
    message: "Turned off",
    date: "2024-11-06T17:39:25.538Z",
    status: "UPDATE",
  },
  {
    deviceName: "Camera",
    message: "Motion detected",
    date: "2023-11-01",
    status: "UPDATE",
  },
  {
    deviceName: "Doorbell",
    message: "Turned on",
    date: "2023-11-01",
    status: "UPDATE",
  },
];

describe("DeviceLogs", () => {
  beforeEach(() => {
    localStorage.setItem("username", "testuser");
    getDeviceLogs.mockResolvedValue({
      data: {
        content: mockLogs,
        totalPages: 2,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("renders table headers correctly", async () => {
    render(<DeviceLogs />);

    expect(await screen.findByText("Device Name")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  test("displays logs on initial load", async () => {
    render(<DeviceLogs />);

    await waitFor(() => {
      mockLogs.forEach((log) => {
        expect(screen.getByText(log.deviceName)).toBeInTheDocument();
        expect(screen.getByText(log.message)).toBeInTheDocument();
        expect(screen.getByText(log.date)).toBeInTheDocument();
        expect(screen.getByText(log.status)).toBeInTheDocument();
      });
    });
  });

  test("disables Previous button on the first page", async () => {
    render(<DeviceLogs />);

    const prevButton = screen.getByRole("button", { name: /prev/i });
    await waitFor(() => expect(prevButton).toBeDisabled());
  });

  test("enables Next button if there are more pages", async () => {
    render(<DeviceLogs />);

    const nextButton = screen.getByRole("button", { name: /next/i });
    await waitFor(() => expect(nextButton).not.toBeDisabled());
  });

  test("fetches and displays next page of logs when Next button is clicked", async () => {
    render(<DeviceLogs />);

    getDeviceLogs.mockResolvedValueOnce({
      data: {
        content: [
          {
            deviceName: "Door Sensor",
            message: "Opened",
            date: "2023-11-02",
            status: "Success",
          },
        ],
        totalPages: 2,
      },
    });

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText("Door Sensor")).toBeInTheDocument();
    });
    expect(getDeviceLogs).toHaveBeenCalledWith("testuser", 1, 5);
  });

  test("disables Next button on the last page", async () => {
    render(<DeviceLogs />);

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(nextButton).toBeDisabled();
    });
  });

  test("handles error fetching logs gracefully", async () => {
    getDeviceLogs.mockRejectedValueOnce(new Error("Network Error"));
    render(<DeviceLogs />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching logs:",
        expect.any(Error)
      );
    });
  });
});

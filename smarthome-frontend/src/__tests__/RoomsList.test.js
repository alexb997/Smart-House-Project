import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RoomList from "./RoomList";
import instance from "../axios";
import { useNavigate } from "react-router-dom";

jest.mock("../axios");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

const mockNavigate = useNavigate();

const mockRooms = [
  { id: 1, name: "Living Room" },
  { id: 2, name: "Bedroom" },
];

describe("RoomList", () => {
  beforeEach(() => {
    instance.get.mockResolvedValue({ data: mockRooms });
    instance.post.mockResolvedValue({});
    instance.put.mockResolvedValue({});
    instance.delete.mockResolvedValue({});
  });

  test("renders 'Rooms' title and 'Add Room' button", async () => {
    render(<RoomList />);
    expect(screen.getByText("Rooms")).toBeInTheDocument();
    expect(screen.getByText("+ Add Room")).toBeInTheDocument();
  });

  test("fetches and displays rooms", async () => {
    render(<RoomList />);
    await waitFor(() => {
      expect(screen.getByText("Living Room")).toBeInTheDocument();
      expect(screen.getByText("Bedroom")).toBeInTheDocument();
    });
  });

  test("displays 'No rooms available!' when no rooms are present", async () => {
    instance.get.mockResolvedValueOnce({ data: [] });
    render(<RoomList />);
    await waitFor(() => {
      expect(screen.getByText("No rooms available!")).toBeInTheDocument();
    });
  });

  test("opens and closes the modal for adding a room", async () => {
    render(<RoomList />);

    // Open modal
    fireEvent.click(screen.getByText("+ Add Room"));
    await waitFor(() => {
      expect(screen.getByText("Add Room")).toBeInTheDocument();
    });

    // Close modal
    fireEvent.click(screen.getByText("Close"));
    await waitFor(() => {
      expect(screen.queryByText("Add Room")).not.toBeInTheDocument();
    });
  });

  test("submits new room data when 'Add Room' is clicked", async () => {
    render(<RoomList />);
    fireEvent.click(screen.getByText("+ Add Room"));
    await waitFor(() => screen.getByText("Add Room"));

    fireEvent.change(screen.getByPlaceholderText("Enter room name"), {
      target: { value: "New Room" },
    });
    fireEvent.click(screen.getByText("Add Room"));

    await waitFor(() => {
      expect(instance.post).toHaveBeenCalledWith("/api/rooms", {
        name: "New Room",
      });
    });
  });

  test("opens modal for editing a room and submits edited room data", async () => {
    render(<RoomList />);
    await waitFor(() => screen.getByText("Living Room"));

    const manageButton = screen.getAllByText("Manage")[0];
    fireEvent.click(manageButton);
    await waitFor(() => screen.getByText("Edit Room"));

    fireEvent.change(screen.getByPlaceholderText("Enter room name"), {
      target: { value: "Updated Room" },
    });
    fireEvent.click(screen.getByText("Save Changes"));

    await waitFor(() => {
      expect(instance.put).toHaveBeenCalledWith(
        `/api/rooms/${mockRooms[0].id}`,
        {
          name: "Updated Room",
          userId: localStorage.getItem("userId"),
        }
      );
    });
  });

  test("deletes a room", async () => {
    render(<RoomList />);
    await waitFor(() => screen.getByText("Living Room"));

    const deleteButton = screen.getAllByText("Remove")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(instance.delete).toHaveBeenCalledWith(
        `/api/rooms/${mockRooms[0].id}`
      );
    });
  });

  test("navigates to the list of devices for a room when 'List Devices' is clicked", async () => {
    render(<RoomList />);
    await waitFor(() => screen.getByText("Living Room"));

    const listDevicesButton = screen.getAllByText("List Devices")[0];
    fireEvent.click(listDevicesButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/Living Room/devices", {
        state: { roomId: 1 },
      });
    });
  });
});

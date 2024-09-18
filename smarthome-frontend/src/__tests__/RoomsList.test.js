import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RoomsList from "../components/RoomsList";
import instance from "../axios";

jest.mock("../axios");

describe("RoomsList Component", () => {
  const mockRooms = [
    { id: 1, name: "Living Room" },
    { id: 2, name: "Bedroom" },
  ];

  beforeEach(() => {
    instance.get.mockResolvedValueOnce({ data: mockRooms });
    instance.delete.mockResolvedValueOnce({});
    instance.post.mockResolvedValueOnce({});
    instance.put.mockResolvedValueOnce({});
    localStorage.setItem("userId", "1");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetches and displays rooms", async () => {
    render(<RoomsList />);

    const livingRoom = await screen.findByText("Living Room");
    const bedroom = await screen.findByText("Bedroom");

    expect(livingRoom).toBeInTheDocument();
    expect(bedroom).toBeInTheDocument();
  });

  test("opens modal to add a new room", () => {
    render(<RoomsList />);

    fireEvent.click(screen.getByText("Add Room"));
    expect(screen.getByLabelText(/Room Name/i)).toBeInTheDocument();
  });

  test("edits an existing room", async () => {
    render(<RoomsList />);

    fireEvent.click(await screen.findByText("Edit"));
    fireEvent.change(screen.getByLabelText(/Room Name/i), {
      target: { value: "New Name" },
    });

    fireEvent.click(screen.getByText("Save Changes"));

    expect(instance.put).toHaveBeenCalledWith("/api/rooms/1", {
      name: "New Name",
      userId: "1",
    });
  });

  test("deletes a room", async () => {
    render(<RoomsList />);

    fireEvent.click(await screen.findByText("Delete"));

    expect(instance.delete).toHaveBeenCalledWith("/api/rooms/1");
  });

  test("displays no rooms message when no rooms available", async () => {
    instance.get.mockResolvedValueOnce({ data: [] });

    render(<RoomsList />);

    expect(await screen.findByText("No rooms available!")).toBeInTheDocument();
  });
});
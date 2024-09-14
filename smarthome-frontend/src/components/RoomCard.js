import React from 'react';
import { Card } from '@material-ui/core';

const RoomCard = ({ room, onSelectRoom }) => {
  return (
    <Card onClick={() => onSelectRoom(room.id)} className="room-card">
      <h3>{room.name}</h3>
      <p>{room.devices.length} Devices</p>
    </Card>
  );
};

export default RoomCard;

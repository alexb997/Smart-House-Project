import { Card } from "react-bootstrap";

function DeviceDetails({ device }) {
  if (device.brightness)
    return <Card.Text>Brightness: {device.brightness}%</Card.Text>;
  else if (device.temperature) {
    return <Card.Text>Temperature: {device.temperature}°C</Card.Text>;
  } else {
    return <></>;
  }
}

export default DeviceDetails;

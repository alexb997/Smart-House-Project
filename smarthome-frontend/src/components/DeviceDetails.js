import { Card } from "react-bootstrap";

function DeviceDetails({ device }) {
  if (device.brightness != 0)
    return <Card.Text>Brightness: {device.brightness}%</Card.Text>;
  else if (device.temperature != 0) {
    return <Card.Text>Temperature: {device.temperature}°C</Card.Text>;
  } else {
    return (
      <Card.Text>
        Motion Detection:{" "}
        {device.motionDetectionEnabled ? "Enabled" : "Disabled"}
      </Card.Text>
    );
  }
}

export default DeviceDetails;

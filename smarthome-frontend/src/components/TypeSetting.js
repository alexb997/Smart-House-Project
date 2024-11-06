import { Form, InputGroup } from "react-bootstrap";

function TypeSetting({ device, settings, handleInputChange }) {
  if (device.type === "LIGHT") {
    return (
      <Form.Group controlId="brightness">
        <Form.Label>Brightness: {settings.brightness}%</Form.Label>
        <InputGroup>
          <Form.Control
            type="range"
            name="brightness"
            min="0"
            max="100"
            value={settings.brightness}
            onChange={handleInputChange}
          />
        </InputGroup>
      </Form.Group>
    );
  } else if (device.type === "THERMOSTAT") {
    return (
      <Form.Group controlId="temperature">
        <Form.Label>Temperature: {settings.temperature}°C</Form.Label>
        <Form.Control
          type="number"
          name="temperature"
          value={settings.temperature}
          onChange={handleInputChange}
          min="0"
          max="50"
        />
      </Form.Group>
    );
  }
}

export default TypeSetting;

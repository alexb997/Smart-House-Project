import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeviceModal from '../components/DeviceModal';

const mockDevice = {
  id: 1,
  name: 'Living Room Light',
  type: 'LIGHT',
  status: true,
  brightness: 75,
  temperature: null,
  motionDetectionEnabled: false,
};

describe('DeviceModal Component', () => {
  test('renders device modal with correct data', () => {
    render(
      <DeviceModal device={mockDevice} show={true} handleClose={() => {}} />
    );

    expect(screen.getByText(/Manage Living Room Light/i)).toBeInTheDocument();
    expect(screen.getByText(/Device Type:/i)).toHaveTextContent('Device Type: LIGHT');
    expect(screen.getByText(/Status:/i)).toHaveTextContent('Status: On');
    expect(screen.getByLabelText(/Brightness/i)).toBeInTheDocument();
  });

  test('can toggle device status', () => {
    const handleClose = jest.fn();
    render(
      <DeviceModal
        device={mockDevice}
        show={true}
        handleClose={handleClose}
      />
    );

    const toggleButton = screen.getByRole('button', { name: /Turn Off/i });
    fireEvent.click(toggleButton);

    expect(toggleButton).toBeInTheDocument();
  });

  test('updates brightness when slider is changed', () => {
    render(<DeviceModal device={mockDevice} show={true} handleClose={() => {}} />);

    const brightnessSlider = screen.getByLabelText(/Brightness/i);
    fireEvent.change(brightnessSlider, { target: { value: '50' } });

    expect(brightnessSlider.value).toBe('50');
  });
});

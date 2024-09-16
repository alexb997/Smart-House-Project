import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Dashboard from '../components/Dashboard';
import { getDevices } from '../service/deviceService';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../service/deviceService');

describe('Dashboard Component', () => {
  const mockDevices = [
    { id: 1, name: 'Device 1', type: 'LIGHT', status: true },
    { id: 2, name: 'Device 2', type: 'THERMOSTAT', status: false },
  ];

  it('should render loading state initially', () => {
    getDevices.mockResolvedValueOnce({ data: mockDevices });
    render(<Dashboard />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display devices after loading', async () => {
    getDevices.mockResolvedValueOnce({ data: mockDevices });
    render(<Dashboard />);
    
    await waitFor(() => expect(getDevices).toHaveBeenCalledTimes(1));
    
    expect(screen.getByText('Device 1')).toBeInTheDocument();
    expect(screen.getByText('Device 2')).toBeInTheDocument();
  });

  it('should show error when device loading fails', async () => {
    getDevices.mockRejectedValueOnce(new Error('Failed to fetch devices'));
    
    render(<Dashboard />);
    
    const errorMessage = await screen.findByText('Failed to load devices. Please try again.');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should open CreateDeviceModal when "Create New Device" button is clicked', () => {
    getDevices.mockResolvedValueOnce({ data: mockDevices });
    render(<Dashboard />);
    
    const createButton = screen.getByText('Create New Device');
    fireEvent.click(createButton);
    
    expect(screen.getByText('Create Device')).toBeInTheDocument();
  });
});

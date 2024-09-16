import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../components/Register';
import { createUser } from '../service/userService';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../service/userService');

describe('Register Component', () => {
  it('should display registration form', () => {
    render(<Register />);
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should display success message on successful registration', async () => {
    createUser.mockResolvedValueOnce({ data: { username: 'newUser' } });

    render(<Register />);
    
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'newUser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'newPassword' } });
    fireEvent.click(screen.getByText(/Register/i));

    const successMessage = await screen.findByText('Registration successful');
    expect(successMessage).toBeInTheDocument();
  });

  it('should display error message on registration failure', async () => {
    createUser.mockRejectedValueOnce(new Error('Registration failed'));

    render(<Register />);
    
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'existingUser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/Register/i));

    const errorMessage = await screen.findByText('Registration failed');
    expect(errorMessage).toBeInTheDocument();
  });
});

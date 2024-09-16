import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../components/Login';
import { loginUser } from '../service/userService';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../service/userService');

describe('Login Component', () => {
  it('should display login form', () => {
    render(<Login />);
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should display success message on successful login', async () => {
    loginUser.mockResolvedValueOnce({ data: { username: 'testUser' } });

    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'testPassword' } });
    fireEvent.click(screen.getByText(/Login/i));
    
    await waitFor(() => expect(screen.getByText('Login successful')).toBeInTheDocument());
    expect(localStorage.getItem('username')).toBe('testUser');
  });

  it('should display error message on failed login', async () => {
    loginUser.mockRejectedValueOnce(new Error('Login failed'));
    
    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'wrongUser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongPassword' } });
    fireEvent.click(screen.getByText(/Login/i));

    const errorMessage = await screen.findByText('Login failed. Invalid username or password.');
    expect(errorMessage).toBeInTheDocument();
  });
});

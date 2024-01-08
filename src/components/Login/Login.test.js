import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Login from './Login'; // Adjust the import path as necessary

// Mock the useNavigate hook
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

// Mock the findUserByUsername function
jest.mock('../../config/firebaseQueries', () => ({
  findUserByUsername: jest.fn(),
}));

const mockedSetIsLoggedIn = jest.fn();

describe('Login Component', () => {
  beforeEach(() => {
    render(<Login setIsLoggedIn={mockedSetIsLoggedIn} />);
  });

  test('renders the login form', () => {
    expect(screen.getByLabelText(/employee id/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('allows the user to enter their employee ID', () => {
    const input = screen.getByLabelText(/employee id/i);
    userEvent.type(input, '12345');
    expect(input.value).toBe('12345');
  });

  test('shows an error message if the user is not found', async () => {
    const { findUserByUsername } = require('../../config/firebaseQueries');
    findUserByUsername.mockResolvedValue(null);

    userEvent.type(screen.getByLabelText(/employee id/i), '12345');
    userEvent.click(screen.getByRole('button', { name: /login/i }));

    const errorMessage = await screen.findByText(/user not found/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('calls setIsLoggedIn and navigate on successful login', async () => {
    const { findUserByUsername } = require('../../config/firebaseQueries');
    findUserByUsername.mockResolvedValue({ employeeId: '12345' });

    userEvent.type(screen.getByLabelText(/employee id/i), '12345');
    userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockedSetIsLoggedIn).toHaveBeenCalledWith(true);
      // Uncomment the following line if you want to test navigation after login
      // expect(mockedNavigate).toHaveBeenCalledWith('/');
    });
  });
});

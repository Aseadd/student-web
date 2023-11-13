import React from 'react';
import { render, screen } from '@testing-library/react';
import StudentList from '../Student';

test('renders Student name menu item', () => {
  render(<StudentList/>);
  const linkElement = screen.getByText(/Student Name/i);
  expect(linkElement).toBeInTheDocument();
});

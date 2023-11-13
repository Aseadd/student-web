import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

test('renders Menu link', () => {
  render(<Navbar/>);
  const linkElement = screen.getByText(/ XY COLLEGE/i);
  expect(linkElement).toBeInTheDocument();
});

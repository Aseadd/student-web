import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Home';

test('renders Watch video button', () => {
  render(<Home/>);
  const linkElement = screen.getByText(/Watch Video/i);
  expect(linkElement).toBeInTheDocument();
});

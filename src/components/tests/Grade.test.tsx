import React from 'react';
import { render, screen } from '@testing-library/react';
import GradeList from '../Grade';

test('renders Add grade button', () => {
  render(<GradeList/>);
  const linkElement = screen.getByText(/Add Grade/i);
  expect(linkElement).toBeInTheDocument();
});

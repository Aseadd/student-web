import React from 'react';
import { render, screen } from '@testing-library/react';
import CourseList from '../Course';

test('renders lCourse column name', () => {
  render(<CourseList/>);
  const linkElement = screen.getByText(/Course Name/i);
  expect(linkElement).toBeInTheDocument();
});

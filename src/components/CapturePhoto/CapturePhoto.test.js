import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CapturePhoto from './CapturePhoto';

describe('<CapturePhoto />', () => {
  test('it should mount', () => {
    render(<CapturePhoto />);
    
    const capturePhoto = screen.getByTestId('CapturePhoto');

    expect(capturePhoto).toBeInTheDocument();
  });
});
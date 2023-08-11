import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrentData from './CurrentData';

describe('<CurrentData />', () => {
  test('it should mount', () => {
    render(<CurrentData />);
    
    const currentData = screen.getByTestId('CurrentData');

    expect(currentData).toBeInTheDocument();
  });
});
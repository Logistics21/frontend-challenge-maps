import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import SearchBar from './SearchBar';

describe('SearchBar', () => {
    const mockHandleClick = jest.fn();

    test('it renders a list of restaurant selection options', () => {
        const wrapper = render(<SearchBar handleClick={mockHandleClick} />);
        const sushiSelector = wrapper.getByText('Sushi');

        fireEvent.click(sushiSelector);
        
        expect(mockHandleClick).toHaveBeenCalledTimes(1);
    });
});

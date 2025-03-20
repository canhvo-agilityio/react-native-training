import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Select from '../';

describe('Select Component', () => {
  const mockData = [
    { title: 'Option 1', value: 'option1' },
    { title: 'Option 2', value: 'option2' },
    { title: 'Option 3', value: 'option3' },
  ];

  const mockOnSelect = jest.fn();

  it('renders correctly', () => {
    const container = render(
      <Select data={mockData} onSelect={mockOnSelect} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('opens the dropdown when the button is pressed', () => {
    const { getByText } = render(
      <Select
        data={mockData}
        placeholder="Select an option"
        onSelect={mockOnSelect}
      />,
    );

    const dropdownButton = getByText('Select an option');
    fireEvent.press(dropdownButton);

    const option1 = getByText('Option 1');
    const option2 = getByText('Option 2');
    const option3 = getByText('Option 3');

    expect(option1).toBeTruthy();
    expect(option2).toBeTruthy();
    expect(option3).toBeTruthy();
  });

  it('calls onSelect with the correct value when an option is selected', () => {
    const { getByText } = render(
      <Select
        data={mockData}
        placeholder="Select an option"
        onSelect={mockOnSelect}
      />,
    );

    const dropdownButton = getByText('Select an option');
    fireEvent.press(dropdownButton);

    const option1 = getByText('Option 1');
    fireEvent.press(option1);

    expect(mockOnSelect).toHaveBeenCalledWith('option1');
  });

  it('closes the dropdown when an option is selected', () => {
    const { getByText, queryByText } = render(
      <Select
        data={mockData}
        placeholder="Select an option"
        onSelect={mockOnSelect}
      />,
    );

    const dropdownButton = getByText('Select an option');
    fireEvent.press(dropdownButton);

    const option1 = getByText('Option 1');
    fireEvent.press(option1);

    expect(queryByText('Option 1')).toBeNull();
  });

  it('renders the error message when provided', () => {
    const { getByText } = render(
      <Select
        data={mockData}
        placeholder="Select an option"
        errorMessage="This is an error"
        onSelect={mockOnSelect}
      />,
    );

    const errorMessage = getByText('This is an error');
    expect(errorMessage).toBeTruthy();
  });
});

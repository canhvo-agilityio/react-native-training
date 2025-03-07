import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Input from '../index';
import { SearchIcon } from '@/components/icons';

describe('Input Component', () => {
  it('renders correctly with default props', () => {
    const container = render(
      <Input value="" placeholder="Enter text" onChangeText={() => {}} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders label correctly', () => {
    const { getByText } = render(
      <Input
        value=""
        placeholder="Enter text"
        label="Label"
        onChangeText={() => {}}
      />,
    );
    const labelElement = getByText('Label');
    expect(labelElement).toBeTruthy();
  });

  it('renders icon correctly', () => {
    const { getByTestId } = render(
      <Input
        value=""
        placeholder="Enter text"
        icon={<SearchIcon />}
        onChangeText={() => {}}
      />,
    );
    const iconElement = getByTestId('search-icon');
    expect(iconElement).toBeTruthy();
  });

  it('renders error message correctly', () => {
    const { getByText } = render(
      <Input
        value=""
        placeholder="Enter text"
        errorMessage="Error"
        onChangeText={() => {}}
      />,
    );
    const errorElement = getByText('Error');
    expect(errorElement).toBeTruthy();
  });

  it('disables input when disabled prop is true', () => {
    const { getByPlaceholderText } = render(
      <Input
        value=""
        placeholder="Enter text"
        disabled
        onChangeText={() => {}}
      />,
    );
    const inputElement = getByPlaceholderText('Enter text');
    expect(inputElement.props.editable).toBe(false);
  });

  it('calls onChangeText when text changes', () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        value=""
        placeholder="Enter text"
        onChangeText={onChangeTextMock}
      />,
    );
    const inputElement = getByPlaceholderText('Enter text');
    fireEvent.changeText(inputElement, 'New text');
    expect(onChangeTextMock).toHaveBeenCalledWith('New text');
  });

  it('calls onSubmitEditing when submit event occurs', () => {
    const onSubmitEditingMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        value=""
        placeholder="Enter text"
        onSubmitEditing={onSubmitEditingMock}
        onChangeText={() => {}}
      />,
    );
    const inputElement = getByPlaceholderText('Enter text');
    fireEvent(inputElement, 'submitEditing');
    expect(onSubmitEditingMock).toHaveBeenCalled();
  });
});

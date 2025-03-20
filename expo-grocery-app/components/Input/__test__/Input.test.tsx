import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Input from '../index';
import { SearchIcon, Show } from '@/components/icons';

describe('Input Component', () => {
  const mockProps = {
    value: 'Test Value',
    placeholder: 'Enter text',
    onChangeText: jest.fn(),
    onSubmitEditing: jest.fn(),
    onPressRightIcon: jest.fn(),
    errorMessage: 'This is an error',
  };
  it('renders correctly with default props', () => {
    const container = render(<Input value={mockProps.value} />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with label and placeholder', () => {
    const { getByText, getByPlaceholderText } = render(
      <Input
        value={mockProps.value}
        placeholder={mockProps.placeholder}
        label="Label"
      />,
    );

    const labelElement = getByText('Label');
    expect(labelElement).toBeTruthy();

    const placeholderElement = getByPlaceholderText(mockProps.placeholder);
    expect(placeholderElement).toBeTruthy();
  });

  it('calls onChangeText when text changes', () => {
    const { getByPlaceholderText } = render(
      <Input
        value={mockProps.value}
        placeholder={mockProps.placeholder}
        onChangeText={mockProps.onChangeText}
      />,
    );

    const inputElement = getByPlaceholderText(mockProps.placeholder);
    fireEvent.changeText(inputElement, 'New Value');

    expect(mockProps.onChangeText).toHaveBeenCalledWith('New Value');
  });

  it('calls onSubmitEditing when the submit event occurs', () => {
    const { getByPlaceholderText } = render(
      <Input
        value={mockProps.value}
        placeholder={mockProps.placeholder}
        onSubmitEditing={mockProps.onSubmitEditing}
      />,
    );

    const inputElement = getByPlaceholderText(mockProps.placeholder);
    fireEvent(inputElement, 'onSubmitEditing');

    expect(mockProps.onSubmitEditing).toHaveBeenCalled();
  });

  it('renders the left and right icons', () => {
    const { getByTestId } = render(
      <Input
        value={mockProps.value}
        leftIcon={<SearchIcon />}
        rightIcon={<Show />}
      />,
    );

    const leftIcon = getByTestId('search-icon');
    expect(leftIcon).toBeTruthy();

    const rightIcon = getByTestId('show-icon');
    expect(rightIcon).toBeTruthy();
  });

  it('calls onPressRightIcon when the right icon is pressed', () => {
    const { getByTestId } = render(
      <Input
        value={mockProps.value}
        rightIcon={<SearchIcon />}
        onPressRightIcon={mockProps.onPressRightIcon}
      />,
    );

    const rightIcon = getByTestId('search-icon');
    fireEvent.press(rightIcon);

    expect(mockProps.onPressRightIcon).toHaveBeenCalled();
  });

  it('renders the error message', () => {
    const { getByText } = render(
      <Input value={mockProps.value} errorMessage={mockProps.errorMessage} />,
    );

    // Check if the error message is rendered
    const errorMessage = getByText(mockProps.errorMessage);
    expect(errorMessage).toBeTruthy();
  });

  it('sound does not call onChangeText when the disabled prop is true', () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        value={mockProps.value}
        placeholder={mockProps.placeholder}
        onChangeText={onChangeMock}
        disabled
      />,
    );

    const inputElement = getByPlaceholderText(mockProps.placeholder);
    fireEvent.changeText(inputElement, 'New Value');

    expect(onChangeMock).not.toHaveBeenCalled();
  });
});

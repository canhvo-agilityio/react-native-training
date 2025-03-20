import { render, fireEvent } from '@testing-library/react-native';

import Button from '../';
import { SearchIcon } from '@/components/icons';

describe('Button Component', () => {
  const mockProps = {
    title: 'Click Me',
  };

  it('renders correctly with default props', () => {
    const container = render(<Button {...mockProps} />).toJSON();
    expect(container).toMatchSnapshot();
  });

  it('calls onPress when button is pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button {...mockProps} onPress={onPressMock} />,
    );
    const buttonElement = getByText(mockProps.title);
    fireEvent.press(buttonElement);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('renders with an icon', () => {
    const { getByTestId } = render(
      <Button {...mockProps} icon={<SearchIcon />} />,
    );
    const iconElement = getByTestId('search-icon');
    expect(iconElement).toBeTruthy();
  });

  it('should does not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button {...mockProps} disabled />);
    const buttonElement = getByText(mockProps.title);

    fireEvent.press(buttonElement);
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('shows a loading indicator when isLoading is true', () => {
    const { getByTestId } = render(<Button {...mockProps} isLoading />);
    const loadingIndicator = getByTestId('loading-indicator');

    expect(loadingIndicator).toBeTruthy();
  });
});

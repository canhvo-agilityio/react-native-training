import { render, userEvent, screen } from 'test-utils';
import Input from '..';
import { Show } from '@/components/icons';

const handleChange = jest.fn();
const handlePressIcon = jest.fn();

describe('Input', () => {
  const mockProps = {
    value: '',
    placeholder: 'Enter text...',
    label: 'Username',
    onChangeText: handleChange,
  };

  it('should render properly', () => {
    const { toJSON } = render(<Input {...mockProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onChangeText callback when text changes', async () => {
    render(<Input {...mockProps} />);
    const input = screen.getByPlaceholderText('Enter text...');
    await userEvent.type(input, 'hello');
    expect(handleChange).toHaveBeenCalledTimes(5);
  });

  it('renders icon within TouchableOpacity if onPressIcon is provided', async () => {
    const mockPropsWithIcon = {
      ...mockProps,
      icon: <Show />,
      onPressIcon: handlePressIcon,
    };
    render(<Input disabled {...mockPropsWithIcon} />);
    const icon = screen.getByTestId('icon');
    await userEvent.press(icon);
    expect(handlePressIcon).toHaveBeenCalled();
  });

  it('renders errorMessage when errorMessage prop is provided', () => {
    const mockPropsWithError = {
      ...mockProps,
      errorMessage: 'Invalid input',
    };

    render(<Input {...mockPropsWithError} />);
    const errorMessageElement = screen.getByText('Invalid input');

    expect(errorMessageElement).toBeDefined();
  });
});

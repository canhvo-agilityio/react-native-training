import { render, userEvent, screen } from 'test-utils';
import Button from '..';

const handlePress = jest.fn();

describe('Button', () => {
  const props = {
    text: 'Click me',
    onPress: handlePress,
  };

  it('should render properly', () => {
    const { toJSON } = render(<Button {...props} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render button component with disabled', () => {
    const { toJSON } = render(<Button disabled {...props} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render button component with isLoading is true', () => {
    const { toJSON } = render(<Button isLoading {...props} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls handlePress when being press', async () => {
    render(<Button {...props} />);
    const button = screen.getByText('Click me');
    await userEvent.press(button);
    expect(handlePress).toHaveBeenCalled();
  });
});

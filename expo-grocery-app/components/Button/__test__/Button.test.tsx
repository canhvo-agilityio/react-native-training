import { render, fireEvent } from '@testing-library/react-native';

import Button from '../';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    const container = render(<Button title="Click Me" />).toJSON();
    expect(container).toMatchSnapshot();
  });

  it('calls onPress when button is pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Press Me" onPress={onPressMock} />,
    );
    const buttonElement = getByText('Press Me');
    fireEvent.press(buttonElement);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});

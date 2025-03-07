import { render, screen } from '@testing-library/react-native';

import Text from '../';
import { fontSizes, textVariant } from '../styles';

describe('Text Component', () => {
  it('renders correctly with default props', () => {
    const container = render(<Text>Hello World</Text>).toJSON();

    expect(screen.getByText('Hello World')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('applies the correct variant style', () => {
    const { getByText } = render(<Text variant="error">Error Text</Text>);
    const textElement = getByText('Error Text');
    expect(textElement.props.style).toContainEqual(textVariant.error);
  });

  it('applies the correct size style', () => {
    const { getByText } = render(<Text size="lg">Large Text</Text>);
    const textElement = getByText('Large Text');
    expect(textElement.props.style).toContainEqual(fontSizes.lg);
  });

  it('applies the correct color', () => {
    const { getByText } = render(<Text color="red">Colored Text</Text>);
    const textElement = getByText('Colored Text');
    expect(textElement.props.style).toContainEqual({ color: 'red' });
  });

  it('applies custom styles', () => {
    const { getByText } = render(
      <Text style={{ fontWeight: 'bold' }}>Bold Text</Text>,
    );
    const textElement = getByText('Bold Text');
    expect(textElement.props.style).toContainEqual({ fontWeight: 'bold' });
  });
});

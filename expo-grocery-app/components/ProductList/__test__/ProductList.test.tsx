import { render, fireEvent } from '@testing-library/react-native';
import ProductList from '../';
import { PRODUCTS } from '@/mocks';

describe('ProductList Component', () => {
  const mockOnPress = jest.fn();

  it('renders the correctly', () => {
    const container = render(
      <ProductList data={PRODUCTS} isGrid={false} onPress={mockOnPress} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('calls onPress when a product card is pressed', () => {
    const { getByText } = render(
      <ProductList data={PRODUCTS} isGrid={false} onPress={mockOnPress} />,
    );

    const firstProductCard = getByText(PRODUCTS[0].name);
    fireEvent.press(firstProductCard);
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('renders in grid layout when isGrid is true', () => {
    const container = render(
      <ProductList data={PRODUCTS} isGrid={true} onPress={mockOnPress} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders in horizontal layout when isGrid is false', () => {
    const container = render(
      <ProductList data={PRODUCTS} isGrid={false} onPress={mockOnPress} />,
    );

    expect(container).toMatchSnapshot();
  });
});

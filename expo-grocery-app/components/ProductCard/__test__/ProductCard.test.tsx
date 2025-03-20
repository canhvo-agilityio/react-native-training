import { render, fireEvent } from '@testing-library/react-native';
import ProductCard from '../';

describe('ProductCard Component', () => {
  const mockProps = {
    id: '1',
    imageUrl: 'https://example.com/image.jpg',
    name: 'Product Name',
    newPrice: 20,
    oldPrice: 30,
    storeName: 'Store Name',
    isEditing: false,
    onPress: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn(),
  };

  it('renders correctly with default props', () => {
    const container = render(<ProductCard {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('calls onPress when the card is pressed', () => {
    const { getByTestId } = render(<ProductCard {...mockProps} />);
    const cardElement = getByTestId('product-card');

    fireEvent.press(cardElement);
    expect(mockProps.onPress).toHaveBeenCalledWith(mockProps.id);
  });

  it('renders edit and delete buttons when isEditing is true', () => {
    const { getByTestId } = render(
      <ProductCard {...mockProps} isEditing={true} />,
    );

    const editButton = getByTestId('pen-icon');
    expect(editButton).toBeTruthy();

    const deleteButton = getByTestId('trash-icon');
    expect(deleteButton).toBeTruthy();
  });

  it('calls onEdit when the edit button is pressed', () => {
    const { getByTestId } = render(
      <ProductCard {...mockProps} isEditing={true} />,
    );
    const editButton = getByTestId('pen-icon');

    // Simulate pressing the edit button
    fireEvent.press(editButton);

    // Check if onEdit is called with the correct id
    expect(mockProps.onEdit).toHaveBeenCalledWith(mockProps.id);
  });

  it('calls onDelete when the delete button is pressed', () => {
    const { getByTestId } = render(
      <ProductCard {...mockProps} isEditing={true} />,
    );
    const deleteButton = getByTestId('trash-icon');

    // Simulate pressing the delete button
    fireEvent.press(deleteButton);

    // Check if onDelete is called with the correct id
    expect(mockProps.onDelete).toHaveBeenCalledWith(mockProps.id);
  });
});

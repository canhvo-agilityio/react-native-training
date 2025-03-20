import { render } from '@testing-library/react-native';
import StoreCard from '../';

describe('StoreCard Component', () => {
  const mockProps = {
    image: 'https://example.com/store-image.jpg',
    storeName: 'Test Store',
  };

  it('renders correctly with image and store name', () => {
    const container = render(<StoreCard {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
});

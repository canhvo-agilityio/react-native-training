import { render } from '@testing-library/react-native';
import StoreList from '../';
import { STORES } from '@/mocks';

describe('StoreList Component', () => {
  it('renders correctly with image and store name', () => {
    const container = render(<StoreList data={STORES} />);
    expect(container).toMatchSnapshot();
  });
});

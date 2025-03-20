import React from 'react';
import { render } from '@testing-library/react-native';
import BannerCard from '../';
import { BANNERS } from '@/mocks';

describe('BannerCard Component', () => {
  const mockProps = BANNERS[0];

  it('renders correctly with title and image', () => {
    const container = render(
      <BannerCard image={mockProps.imageUrl} title={mockProps.title} />,
    ).toJSON();
    expect(container).toMatchSnapshot();
  });
});

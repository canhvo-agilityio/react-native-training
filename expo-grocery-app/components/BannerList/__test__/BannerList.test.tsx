import React from 'react';
import { render } from '@testing-library/react-native';
import BannerList from '../';
import { BANNERS } from '@/mocks';

describe('BannerList Component', () => {
  it('renders correctly with data', () => {
    const container = render(<BannerList data={BANNERS} />).toJSON();
    expect(container).toMatchSnapshot();
  });
});

import { render } from 'test-utils';

import Text from '..';

describe('Text', () => {
  const props = {
    value: 'Text content',
  };
  it('should render text component with default props', () => {
    const { toJSON } = render(<Text {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render text component with variant heading', () => {
    const { toJSON } = render(<Text {...props} variant="heading" size="2xl" />);

    expect(toJSON()).toMatchSnapshot();
  });
});

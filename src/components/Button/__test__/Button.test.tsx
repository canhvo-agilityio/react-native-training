import { Button } from '../index';
import { render, screen } from 'test-utils';

describe('Button', () => {
  it('should render properly', () => {
    const { toJSON } = render(<Button>Press me</Button>);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render correct content in the button', () => {
    render(<Button>Press me</Button>);
    expect(screen.getByText('Press me')).toBeVisible();
  });
});

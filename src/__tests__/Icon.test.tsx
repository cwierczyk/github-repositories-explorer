import { Icon } from '@/components';
import { render } from '@/test';

describe('Icon Component', () => {
  it('renders with default props', () => {
    const { getByRole } = render(<Icon icon="/path/to/icon.svg" />);

    const icon = getByRole('img');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle('min-height: 1.5rem');
    expect(icon).toHaveStyle('min-width: 1.5rem');
    expect(icon).toHaveStyle('background-color: currentColor');
    expect(icon).toHaveStyle("mask-image: url('/path/to/icon.svg')");
  });

  it('renders with custom size and color', () => {
    const { getByRole } = render(
      <Icon icon="/path/to/icon.svg" size="2rem" color="red" />,
    );

    const icon = getByRole('img');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle('min-height: 2rem');
    expect(icon).toHaveStyle('min-width: 2rem');
    expect(icon).toHaveStyle('background-color: rgb(255, 0, 0)');
    expect(icon).toHaveStyle("mask-image: url('/path/to/icon.svg')");
  });

  it('passes additional props to the component', () => {
    const { getByRole } = render(
      <Icon icon="/path/to/icon.svg" className="custom-class" />,
    );

    const icon = getByRole('img');

    expect(icon).toHaveClass('custom-class');
  });
});

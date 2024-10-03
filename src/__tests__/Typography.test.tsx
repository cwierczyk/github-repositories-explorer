import { describe, expect } from 'vitest';

import { Typography } from '@/components';
import { render } from '@/test';

describe('Typography component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<Typography>Test Text</Typography>);

    const text = getByText('Test Text');

    expect(text).toBeInTheDocument();

    expect(text.tagName).toBe('SPAN');
  });

  it('applies default props correctly', () => {
    const { getByText } = render(<Typography>Test Text</Typography>);

    const text = getByText('Test Text');

    expect(text).toHaveStyle('font-size: 1rem');
    expect(text).toHaveStyle('line-height: 1.5rem');
    expect(text).toHaveStyle('font-weight: 400');
    expect(text).toHaveStyle('color: rgb(245, 245, 246)');
  });

  it('renders with custom size, weight, and color', () => {
    const { getByText } = render(
      <Typography size="lg" fontWeight="bold" color="secondary">
        Custom Styled Text
      </Typography>,
    );

    const text = getByText('Custom Styled Text');

    expect(text).toHaveStyle('font-size: 1.125rem');
    expect(text).toHaveStyle('line-height: 1.75rem');
    expect(text).toHaveStyle('font-weight: 700');
    expect(text).toHaveStyle('color: rgb(206, 207, 210)');
  });

  it('renders as a different HTML tag', () => {
    const { getByText } = render(
      <Typography tag="h1">Heading Text</Typography>,
    );

    const text = getByText('Heading Text');

    expect(text.tagName).toBe('H1');
  });

  it('inherits styles when inherit is true', () => {
    const { getByText } = render(
      <div
        style={{
          fontSize: '30px',
          lineHeight: '42px',
          fontWeight: 'bold',
          color: '#ffffff',
        }}
      >
        <Typography inherit>Inherit Styles</Typography>
      </div>,
    );

    const text = getByText('Inherit Styles');

    expect(text).toHaveStyle('font-size: inherit');
    expect(text).toHaveStyle('line-height: inherit');
    expect(text).toHaveStyle('font-weight: inherit');
    expect(text).toHaveStyle('color: rgb(255, 255, 255)');
  });
});

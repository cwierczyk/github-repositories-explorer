import { createRef } from 'react';
import { fireEvent } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';

import { BaseButton } from '@/components';
import { render } from '@/test';

describe('BaseButton component', () => {
  it('renders the button with correct type', () => {
    const { getByRole } = render(<BaseButton type="submit">Submit</BaseButton>);

    const button = getByRole('button', { name: /submit/i });

    expect(button).toHaveAttribute('type', 'submit');
  });

  it('renders the button with default type "button"', () => {
    const { getByRole } = render(<BaseButton>Default</BaseButton>);

    const button = getByRole('button', { name: /default/i });

    expect(button).toHaveAttribute('type', 'button');
  });

  it('sets the disabled attribute when passed', () => {
    const { getByRole } = render(<BaseButton disabled>Disabled</BaseButton>);

    const button = getByRole('button', { name: /disabled/i });

    expect(button).toBeDisabled();
  });

  it('calls onClick handler when clicked and not disabled', () => {
    const handleClick = vi.fn();

    const { getByRole } = render(
      <BaseButton onClick={handleClick}>Click me</BaseButton>,
    );

    const button = getByRole('button', { name: /click me/i });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick handler when disabled', () => {
    const handleClick = vi.fn();

    const { getByRole } = render(
      <BaseButton onClick={handleClick} disabled>
        Cannot click
      </BaseButton>,
    );

    const button = getByRole('button', { name: /cannot click/i });

    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should forward ref to the button element', () => {
    const ref = createRef<HTMLButtonElement>();

    render(<BaseButton ref={ref}>Ref</BaseButton>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('should call the callback ref with the button element', () => {
    const ref = vi.fn();

    render(<BaseButton ref={ref}>Ref</BaseButton>);

    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });

  it('should focus the button when focus is called on the ref', () => {
    const ref = createRef<HTMLButtonElement>();

    const { getByRole } = render(<BaseButton ref={ref}>Ref focus</BaseButton>);

    ref.current?.focus();

    const button = getByRole('button', { name: /ref focus/i });
    expect(button).toHaveFocus();
  });

  it('renders the button with custom class name', () => {
    const { getByRole } = render(
      <BaseButton className="custom-class">Custom class</BaseButton>,
    );

    const button = getByRole('button', { name: /custom class/i });

    expect(button).toHaveClass('custom-class');
  });
});

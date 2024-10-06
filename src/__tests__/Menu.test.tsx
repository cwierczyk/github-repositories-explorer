import { fireEvent, waitFor } from '@testing-library/react';
import { describe, vi } from 'vitest';

import { BaseButton, Menu } from '@/components';
import { render } from '@/test';

describe('Menu component', () => {
  const items = [
    {
      label: 'Option 1',
      onClick: vi.fn(),
    },
    {
      label: 'Option 2',
      onClick: vi.fn(),
    },
  ];

  it('renders the trigger button', () => {
    const { getByRole } = render(
      <Menu trigger={<BaseButton>Open Menu</BaseButton>} items={items} />,
    );

    expect(getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  it('opens and closes the menu on trigger click', () => {
    const { queryByRole, getByRole } = render(
      <Menu trigger={<BaseButton>Open Menu</BaseButton>} items={items} />,
    );

    expect(queryByRole('menu')).not.toBeInTheDocument();

    const button = getByRole('button', { name: /open menu/i });

    fireEvent.click(button);

    const menu = getByRole('menu');

    expect(menu).toBeInTheDocument();

    fireEvent.click(button);

    expect(menu).not.toBeInTheDocument();
  });

  it('closes the menu on outside click (ClickAwayListener)', () => {
    const { getByRole } = render(
      <Menu trigger={<BaseButton>Open Menu</BaseButton>} items={items} />,
    );

    fireEvent.click(getByRole('button', { name: /open menu/i }));

    const menu = getByRole('menu');

    expect(menu).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    expect(menu).not.toBeInTheDocument();
  });

  it('calls onClick for menu item and closes the menu', () => {
    const { getByRole } = render(
      <Menu trigger={<BaseButton>Open Menu</BaseButton>} items={items} />,
    );

    fireEvent.click(getByRole('button', { name: /open menu/i }));

    const menu = getByRole('menu');

    expect(menu).toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: /option 1/i }));

    expect(items[0].onClick).toHaveBeenCalledTimes(1);

    expect(menu).not.toBeInTheDocument();
  });

  it('closes the menu when Escape key is pressed', () => {
    const { getByRole, getByTestId } = render(
      <Menu trigger={<BaseButton>Open Menu</BaseButton>} items={items} />,
    );

    fireEvent.click(getByRole('button', { name: /open menu/i }));

    const menu = getByRole('menu');

    expect(menu).toBeInTheDocument();

    fireEvent.keyDown(getByTestId('key-listener'), { key: 'Escape' });

    expect(menu).not.toBeInTheDocument();
  });

  it('focuses back to trigger button after closing the menu', async () => {
    const { getByRole } = render(
      <Menu trigger={<BaseButton>Open Menu</BaseButton>} items={items} />,
    );

    const button = getByRole('button', { name: /open menu/i });

    fireEvent.click(button);

    const menu = getByRole('menu');

    expect(menu).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    await waitFor(() => expect(menu).not.toBeInTheDocument());

    expect(button).toHaveFocus();
  });
});

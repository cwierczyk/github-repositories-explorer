import { fireEvent } from '@testing-library/react';
import { describe, vi } from 'vitest';

import { ClickAwayListener } from '@/components';
import { render } from '@/test';

describe('ClickAwayListener component', () => {
  it('renders children', () => {
    const onClickAway = vi.fn();

    const { getByText } = render(
      <ClickAwayListener onClickAway={onClickAway}>
        <div>Children</div>
      </ClickAwayListener>,
    );

    expect(getByText('Children')).toBeInTheDocument();
  });

  it('calls onClickAway when clicked outside', () => {
    const onClickAway = vi.fn();

    const { getByText } = render(
      <ClickAwayListener onClickAway={onClickAway}>
        <div>Children</div>
      </ClickAwayListener>,
    );

    expect(getByText('Children')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    expect(onClickAway).toHaveBeenCalledTimes(1);
  });
});

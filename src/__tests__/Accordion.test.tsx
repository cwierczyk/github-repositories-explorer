import { fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, vi } from 'vitest';

import { Accordion } from '@/components';
import { render } from '@/test';

describe('Accordion Component', () => {
  const mockOnExpand = vi.fn();

  beforeEach(() => {
    mockOnExpand.mockClear();
  });

  it('renders closed Accordion with title', () => {
    const { getByRole, queryByText } = render(
      <Accordion
        open={false}
        title="Test Accordion"
        content={<div>Content</div>}
        onExpand={mockOnExpand}
      />,
    );

    const header = getByRole('button', { name: /test accordion/i });

    expect(header).toBeInTheDocument();

    expect(queryByText('Content')).not.toBeInTheDocument();
  });

  it('renders open Accordion with content', () => {
    const { getByRole, getByText } = render(
      <Accordion
        open={true}
        title="Test Accordion"
        content={<div>Content</div>}
        onExpand={mockOnExpand}
      />,
    );

    const header = getByRole('button', { name: /test accordion/i });

    expect(header).toBeInTheDocument();

    expect(getByText('Content')).toBeInTheDocument();
  });

  it('calls onExpand when header is clicked', () => {
    const { getByRole } = render(
      <Accordion
        open={false}
        title="Test Accordion"
        content={<div>Content</div>}
        onExpand={mockOnExpand}
      />,
    );

    const header = getByRole('button', { name: /test accordion/i });

    fireEvent.click(header);

    expect(mockOnExpand).toHaveBeenCalledTimes(1);
  });

  it('calls onExpand when Enter key is pressed', () => {
    const { getByRole } = render(
      <Accordion
        open={false}
        title="Test Accordion"
        content={<div>Content</div>}
        onExpand={mockOnExpand}
      />,
    );

    const header = getByRole('button', { name: /test accordion/i });

    fireEvent.keyDown(header, { key: 'Enter', code: 'Enter' });

    expect(mockOnExpand).toHaveBeenCalledTimes(1);
  });

  it('calls onExpand when Space key is pressed', () => {
    const { getByRole } = render(
      <Accordion
        open={false}
        title="Test Accordion"
        content={<div>Content</div>}
        onExpand={mockOnExpand}
      />,
    );

    const header = getByRole('button', { name: /test accordion/i });

    fireEvent.keyDown(header, { key: ' ', code: 'Space' });

    expect(mockOnExpand).toHaveBeenCalledTimes(1);
  });
});

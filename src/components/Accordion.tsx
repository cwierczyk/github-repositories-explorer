import {
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import styled from '@emotion/styled';

import { ChevronDownIcon } from '@/assets/icons';
import { Icon } from '@/components/Icon';
import { Typography } from '@/components/Typography';
import { type FunctionComponent } from '@/types';

interface Props {
  open: boolean;
  title: string;
  content: ReactElement;
  onExpand: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
  ) => void;
}

export const Accordion: FunctionComponent<Props> = ({
  open,
  title,
  content,
  onExpand,
}) => {
  const id = useId();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  const headerId = `accordion-header-${id}`;
  const contentId = `accordion-content-${id}`;

  useEffect(() => {
    if (maxHeight) return;
    setMaxHeight(contentRef.current?.scrollHeight ?? 0);
  }, [maxHeight, open]);

  return (
    <Container>
      <Header
        onClick={onExpand}
        aria-expanded={open}
        aria-controls={contentId}
        id={headerId}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onExpand(event);
          }
        }}
      >
        <Typography inherit>{title}</Typography>
        <StyledIcon icon={ChevronDownIcon} $open={open} />
      </Header>
      <Content
        ref={contentRef}
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        $open={open}
        $maxHeight={`${maxHeight}px`}
      >
        {open && content}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Header = styled.button`
  border: none;
  outline: none;
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: ${({ theme }) => theme.fonts.size.md};
  line-height: ${({ theme }) => theme.fonts.lineHeight.md};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.button.ghostBgHover};
  }
`;

const StyledIcon = styled(Icon)<{ $open: boolean }>`
  transition: 0.25s ease all;
  rotate: ${({ $open }) => ($open ? '180deg' : '0')};
`;

const Content = styled.div<{ $open: boolean; $maxHeight: string }>`
  max-height: ${({ $open, $maxHeight }) => ($open ? $maxHeight : '0')};
  overflow: hidden;
  transition: 0.25s max-height ease-in-out;
`;

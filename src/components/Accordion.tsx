import {
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  useId,
} from 'react';
import styled from '@emotion/styled';

import { ChevronDownIcon } from '@/assets/icons';
import { type FunctionComponent } from '@/types';

import { Icon } from './Icon';
import { Typography } from './Typography';

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

  const headerId = `accordion-header-${id}`;
  const contentId = `accordion-content-${id}`;

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
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        $open={open}
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
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.colors.button.ghostBgHover};
  }
`;

const StyledIcon = styled(Icon)<{ $open: boolean }>`
  transition: 0.25s ease all;
  rotate: ${({ $open }) => ($open ? '180deg' : '0')};
`;

const Content = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? 'max-content' : '0')};
  overflow: auto;
  transition: 0.25s max-height ease-in-out;
`;

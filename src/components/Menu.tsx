import {
  type MouseEvent,
  type ReactElement,
  useId,
  useRef,
  useState,
} from 'react';
import styled from '@emotion/styled';

import { type FunctionComponent } from '@/types';

import { type BaseButtonProps } from './button';
import { ClickAwayListener } from './ClickAwayListener';
import { Typography } from './Typography';

interface Props {
  trigger: ReactElement<BaseButtonProps>;
  items: {
    label: string;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    startIcon?: ReactElement;
  }[];
  ariaLabel?: string;
}

export const Menu: FunctionComponent<Props> = ({
  items,
  trigger,
  ariaLabel,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  const closeMenu = () => {
    buttonRef.current?.focus();
    setIsOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={closeMenu}>
      <div
        onKeyDown={(event) => event.key === 'Escape' && closeMenu()}
        data-testid="key-listener"
      >
        <trigger.type
          {...trigger.props}
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            trigger.props.onClick?.(event);
            setIsOpen((prev) => !prev);
          }}
          ariaExpanded={isOpen}
          ariaHaspopup
          ariaControls={id}
          ref={buttonRef}
        />
        {isOpen && (
          <Container id={id} role="menu" aria-label={ariaLabel}>
            {items.map(({ label, onClick, startIcon }, index) => (
              <ListItem key={index.toString()} role="menuitem">
                <ListItemButton
                  onClick={(event) => {
                    onClick(event);
                    closeMenu();
                  }}
                >
                  {startIcon}
                  <Typography fontWeight="semibold" color="secondary">
                    {label}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </Container>
        )}
      </div>
    </ClickAwayListener>
  );
};

const Container = styled.ul`
  list-style: none;
  max-width: 250px;
  min-width: 125px;
  position: absolute;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => `${theme.spacing.sm} 0`};
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const ListItem = styled.li`
  display: flex;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.secondary};
  }
`;

const ListItemButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.25s ease all;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  &:hover {
    background: ${({ theme }) => theme.colors.button.ghostBgHover};
  }
`;

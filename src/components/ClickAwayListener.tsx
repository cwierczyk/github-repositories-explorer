import { type ReactNode, useEffect, useRef } from 'react';

import { type FunctionComponent } from '@/types';

interface Props {
  children: ReactNode;
  onClickAway: () => void;
}

export const ClickAwayListener: FunctionComponent<Props> = ({
  children,
  onClickAway,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClickAway();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickAway]);

  return <div ref={containerRef}>{children}</div>;
};

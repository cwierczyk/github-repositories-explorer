import type { ReactNode } from 'react';

import { ThemeProvider } from '@/providers';
import type { FunctionComponent } from '@/types';

interface Props {
  children: ReactNode;
}

export const TestProviders: FunctionComponent<Props> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

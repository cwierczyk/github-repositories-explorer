import { type ReactElement, type ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';

import { ReactQueryProvider, ThemeProvider } from '@/providers';
import { type FunctionComponent } from '@/types';

interface Props {
  children: ReactNode;
}

const AllTheProviders: FunctionComponent<Props> = ({ children }) => (
  <ThemeProvider>
    <ReactQueryProvider>{children}</ReactQueryProvider>
  </ThemeProvider>
);

const customRender = (ui: ReactElement, options: RenderOptions = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

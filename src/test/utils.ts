import { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';

import { TestProviders } from './TestProviders';

const customRender = (ui: ReactElement, options: RenderOptions = {}) =>
  render(ui, { wrapper: TestProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

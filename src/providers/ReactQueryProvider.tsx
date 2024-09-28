import { type ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { isProduction } from '@/const';
import { type FunctionComponent } from '@/types';

interface Props {
  children: ReactElement;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    },
  },
});

export const ReactQueryProvider: FunctionComponent<Props> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    {!isProduction && <ReactQueryDevtools />}
  </QueryClientProvider>
);

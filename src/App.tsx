import { ErrorBoundary as NativeErrorBoundary } from 'react-error-boundary';

import {
  Container,
  ErrorBoundary,
  Layout,
  Suspense,
  Typography,
} from '@/components';
import { isProduction } from '@/const';
import { useTranslation } from '@/hooks';
import { ReactQueryProvider, ThemeProvider } from '@/providers';
import { errorFallbackRender } from '@/utils';

import '@/i18n';

function App() {
  const { t } = useTranslation('common');

  return (
    <NativeErrorBoundary
      fallbackRender={(props) =>
        errorFallbackRender({
          ...props,
          text: isProduction ? t('errorMessage.production') : undefined,
        })
      }
    >
      <ThemeProvider>
        <ReactQueryProvider>
          <ErrorBoundary>
            <Suspense>
              <Layout>
                <Container>
                  <Typography size="xl" fontWeight="semibold">
                    App feature
                  </Typography>
                </Container>
              </Layout>
            </Suspense>
          </ErrorBoundary>
        </ReactQueryProvider>
      </ThemeProvider>
    </NativeErrorBoundary>
  );
}

export default App;

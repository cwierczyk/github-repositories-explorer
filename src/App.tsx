import { ErrorBoundary as NativeErrorBoundary } from 'react-error-boundary';

import {
  ErrorBoundary,
  LanguageButton,
  Suspense,
  ThemeButton,
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
        <ErrorBoundary>
          <ReactQueryProvider>
            <Suspense>
              <>
                <h1>App</h1>
                <Typography tag="h1" size="xl">
                  test
                </Typography>
                <ThemeButton />
                <LanguageButton />
              </>
            </Suspense>
          </ReactQueryProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </NativeErrorBoundary>
  );
}

export default App;

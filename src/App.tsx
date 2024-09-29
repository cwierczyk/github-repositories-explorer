import { ErrorBoundary as NativeErrorBoundary } from 'react-error-boundary';

import {
  Container,
  ErrorBoundary,
  Layout,
  Suspense,
  TextInput,
  Typography,
  UserRepository,
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
                  <TextInput placeholder="Search some user" />
                  <UserRepository
                    title="Repository title"
                    description="This repository contains a collection of user-related data and functionalities. It provides an interface to manage user information, track user activities, and integrate with other user-centric services. The repository is designed to be scalable and maintainable, ensuring that user data is handled efficiently and securely."
                    follows={48}
                  />
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

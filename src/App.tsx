import { LanguageButton, ThemeButton, Typography } from '@/components';
import { ReactQueryProvider, ThemeProvider } from '@/providers';

import '@/i18n';

function App() {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <>
          <h1>App</h1>
          <Typography tag="h1" size="xl">
            test
          </Typography>
          <ThemeButton />
          <LanguageButton />
        </>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}

export default App;

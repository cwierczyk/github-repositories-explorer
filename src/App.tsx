import { LanguageButton, ThemeButton } from '@/components';
import { ReactQueryProvider, ThemeProvider } from '@/providers';

import '@/i18n';

function App() {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <>
          <h1>App</h1>
          <ThemeButton />
          <LanguageButton />
        </>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}

export default App;

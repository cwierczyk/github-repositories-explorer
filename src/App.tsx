import { LanguageButton, ThemeButton } from '@/components';
import { ThemeProvider } from '@/providers';

import '@/i18n';

function App() {
  return (
    <ThemeProvider>
      <>
        <h1>App</h1>
        <ThemeButton />
        <LanguageButton />
      </>
    </ThemeProvider>
  );
}

export default App;

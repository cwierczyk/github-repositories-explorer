import { ThemeButton } from '@/components';
import { ThemeProvider } from '@/providers';

function App() {
  return (
    <ThemeProvider>
      <>
        <h1>App</h1>
        <ThemeButton />
      </>
    </ThemeProvider>
  );
}

export default App;

import { ThemeProvider } from './app/providers/theme-provider';
import { MainPage } from './pages/main';

const App = () => {
  return (
    <>
      <ThemeProvider />
      <MainPage />
    </>
  );
};

export default App;

import { ThemeProvider } from './app/providers/theme-provider';
import { SettingsDialog } from './widgets/settings-dialog';

const App = () => {
  return (
    <>
      <ThemeProvider />
      <SettingsDialog />
    </>
  );
};

export default App;

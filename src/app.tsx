import { Route, Routes } from 'react-router';

import { ThemeProvider } from './app/providers/theme-provider';
import { MainPage } from './pages/main';
import { TaskPage } from './pages/task';
import { NavMenu } from './widgets/nav-menu';
import { SettingsDialog } from './widgets/settings-dialog';

const App = () => {
  return (
    <>
      <div
        className="container relative my-2 flex w-full items-center
          justify-between"
      >
        <div className="md:w-1/3">
          <img className="size-8" src="/logo/abstract.svg" alt="logo" />
        </div>
        <NavMenu />
        <div className="flex justify-end md:w-1/3">
          <SettingsDialog />
        </div>
      </div>
      <ThemeProvider />
      <Routes>
        {/* TODO: Page is under development - implementing main layout and core functionality */}
        {/* <Route index element={<MainPage />} /> */}
        {/* TODO: Add path="task" */}
        <Route index element={<TaskPage />} />
      </Routes>
    </>
  );
};

export default App;

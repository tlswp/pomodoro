import { Route, Routes } from 'react-router';

import { ThemeProvider } from './app/providers/theme-provider';
import { MainPage } from './pages/main';
import { TaskPage } from './pages/task';
import { NavMenu } from './widgets/nav-menu';

const App = () => {
  return (
    <>
      <div className="my-2 flex w-full items-center justify-center">
        <NavMenu />
      </div>
      <ThemeProvider />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="task" element={<TaskPage />} />
      </Routes>
    </>
  );
};

export default App;

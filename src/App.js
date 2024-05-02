import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import TaskTrackerApp from './components/TaskTrackerApp';
import Settings from './components/Settings';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#000000', 
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<TaskTrackerApp toggleDarkMode={toggleDarkMode} />} />
        <Route path="/settings" element={<Settings toggleDarkMode={toggleDarkMode} />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;

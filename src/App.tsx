import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store/store';
import { Provider } from 'react-redux';
import React from 'react';
import { JobsView } from './Jobs/JobsView';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

interface Props {}

export function App(props: Props) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <JobsView />
      </ThemeProvider>
    </Provider>
  );
}

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import store from "./store";
import "./index.css";
import App from "./App";

const font =  "'DM Sans', sans-serif";

const theme = createTheme({
  palette: {
    primary: {
      main: '#b0cb1f',
      light: '#5e7281',
    },
    secondary: {
      main: '#ef7f1a',
      light: '#fcd4b2',
      contrastText: '#47008F',
    },
    light: {
      main: '#fff',
      light:'#e7e7e7'
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform:'none',
          fontSize: '16px',
          boxShadow: 'none'
        },
      },
    },
  },
  typography: {
    fontFamily: font,
    fontSize: 10,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
  <Provider store={store}>
  <App />
</Provider>
</ThemeProvider>,
);
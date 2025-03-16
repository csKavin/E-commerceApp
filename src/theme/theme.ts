// src/theme.ts
import { createTheme } from '@mui/material/styles';

// Light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3949ab',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Nunito, sans-serif', 
  },
});


// Dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Specifies dark mode
    primary: {
      main: '#3949ab', // Main color for dark theme
    },
    secondary: {
      main: '#ECECED', // You can change this if needed
    },
    background: {
      default: '#121212', // Dark background color
      paper: '#1d1d1d', // Paper background for cards, etc.
    },
  },
  typography: {
    fontFamily: 'Nunito, sans-serif', 

  },
});

// src/components/ThemeToggle.tsx
import React from 'react';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface ThemeToggleProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme, isDarkMode }) => {
  const theme = useTheme();
  
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={toggleTheme}
      style={{ position: 'fixed', top: 16, right: 16 ,textTransform:'capitalize'}}
    >
   {isDarkMode ? 'Light' : 'Dark'} 
    </Button>
  );
};

export default ThemeToggle;

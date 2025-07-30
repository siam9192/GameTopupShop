'use client';
import { EThemeMode } from '@/types';
import { createTheme, ThemeProvider } from '@mui/material';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

const getDesignTokens = (mode: EThemeMode) => ({
  palette: {
    mode,
    primary: {
      main: '#FF4F0F', // Custom primary
      border: '#0F0F0F',
    },
    secondary: {
      main: '#03A6A1', // Custom primary
      text: '#1D293D',
    },
    background: {
      default: mode === 'light' ? '#ffffff' : '#0F0F0F',
      paper: mode === 'light' ? '#f5f5f5' : '#1c1c1c',
    },
    foreground: {
      default: mode === 'light' ? '#0F0F0F' : '#ffffff',
      muted: mode === 'light' ? '#5f5f5f' : '#b0b0b0',
    },
    text: {
      primary: mode === 'light' ? '#0F0F0F' : '#ffffff',
      secondary: mode === 'light' ? '#555555' : '#bbbbbb',
    },

    typography: {
      fontfamily: `'Open Sans' , 'Jost' , sans-serif`,
    },
  },
  breakpoints: {
    values: {
      xs: 0, // Tailwind: base
      sm: 640, // Tailwind: sm
      md: 768, // Tailwind: md
      lg: 1024, // Tailwind: lg
      xl: 1280, // Tailwind: xl
      xxl: 1536, // Tailwind: 2xl (custom key)
    },
    components: {
      MuiContainer: {
        defaultProps: {
          maxWidth: 'xl', // default maxWidth
        },
        styleOverrides: {
          maxWidthXl: {
            maxWidth: '1280px', // Tailwind xl
            '@media (min-width:1536px)': {
              maxWidth: '1536px', // Tailwind 2xl
            },
          },
        },
      },
    },
  },
});

export type TCustomThemeProviderContext = {
  mode: EThemeMode;
  setMode: Dispatch<SetStateAction<EThemeMode>>;
};

export const CustomThemeProviderContext = createContext<TCustomThemeProviderContext | null>(null);

function CustomThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<EThemeMode>(EThemeMode.DARK);
  const theme = createTheme(getDesignTokens(mode));

  const value = {
    mode,
    setMode,
  };
  return (
    <ThemeProvider theme={theme}>
      <CustomThemeProviderContext.Provider value={value}>
        {children}
      </CustomThemeProviderContext.Provider>
    </ThemeProvider>
  );
}

export default CustomThemeProvider;

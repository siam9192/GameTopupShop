'use client';
import useCustomThemeProviderContext from '@/context/useCustomThemeProviderContext';
import { EThemeMode } from '@/types';
import { IconButton, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

function ToggleThemeMode() {
  const theme = useTheme();
  const { setMode } = useCustomThemeProviderContext();
  const themeMode = theme.palette.mode;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  return (
    <IconButton
      onClick={() => setMode(EThemeMode.DARK === themeMode ? EThemeMode.LIGHT : EThemeMode.DARK)}
      color="secondary"
      aria-label="add an alarm"
    >
      {themeMode === EThemeMode.DARK ? (
        <MdOutlineDarkMode size={28} />
      ) : (
        <MdOutlineLightMode size={28} />
      )}
    </IconButton>
  );
}

export default ToggleThemeMode;

'use client';
import React from 'react';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  Typography,
  useTheme,
  Paper,
} from '@mui/material';
import { LuMessageSquareText } from 'react-icons/lu';
import { RiMenuUnfoldLine } from 'react-icons/ri';
import ToggleThemeMode from '../ui/ToggleThemeMode';
import NotificationBar from '../ui/NotificationBar';
import { useCurrentUser } from '@/provider/CurrentUserProvider';
import { Administrator } from '@/types/administrator.type';
function ControlDashboardHeader() {
  const theme = useTheme();
  const data = useCurrentUser();
  const user = data.user as Administrator;

  

  return (
    <Paper
      elevation={1}
      sx={{
        px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 8 },
        py: { xs: 1.5, sm: 2, md: 2.5 },
       
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backdropFilter: 'blur(8px)',
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'rgba(30,30,30,0.8)'
            : 'rgba(255,255,255,0.7)',
      }}
    >
      {/* Left Section */}
      <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 2, md: 3 }}>
        <IconButton color="secondary">
          <RiMenuUnfoldLine size={24} />
        </IconButton>

        <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 1.5, md: 2 }}>
          <Avatar
            alt={user?.name?.first}
            src={
              user?.profilePicture ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyW2MAFrFnfa_bT1jSttLbmvfotJcqQyCCGg&s'
            }
            variant="rounded"
            sx={{
              width: { xs: 32, sm: 36, md: 44, lg: 48, xl: 52, xxl: 56 },
              height: { xs: 32, sm: 36, md: 44, lg: 48, xl: 52, xxl: 56 },
              border: `2px solid ${theme.palette.secondary.main}`,
            }}
          />

          {/* Hide greeting on small screens */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography
              variant="subtitle2"
              fontFamily="Jost"
              fontWeight={600}
              color="secondary"
              sx={{
                fontSize: {
                  xs: 14,
                  sm: 16,
                  md: 18,
                  lg: 20,
                  xl: 22,
                  xxl: 24,
                },
              }}
            >
              Welcome,
            </Typography>
            <Typography
              variant="subtitle1"
              fontFamily="Jost"
              fontWeight={600}
              color="text.primary"
              sx={{
                fontSize: {
                  xs: 12,
                  sm: 14,
                  md: 16,
                  lg: 18,
                  xl: 20,
                  xxl: 22,
                },
              }}
            >
              {user?.name?.first} ({user?.level?.replace('_', '')})
            </Typography>
          </Box>
        </Stack>
      </Stack>

      {/* Right Section */}
      <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 2, md: 3 }}>
        <NotificationBar />
        <ToggleThemeMode />
      </Stack>
    </Paper>
  );
}

export default ControlDashboardHeader;

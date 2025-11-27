'use client';
import React from 'react';
import { Avatar, Box, IconButton, Stack, Typography, useTheme,  } from '@mui/material';
import { RiMenuUnfold4Line } from 'react-icons/ri';
import ToggleThemeMode from '../ui/ToggleThemeMode';
import NotificationBar from '../ui/NotificationBar';
import { useCurrentUser } from '@/provider/CurrentUserProvider';
import { Administrator } from '@/types/administrator.type';
import { useControlDashboardLayoutContext } from '@/app/(admin-dashboard)/control-dashboard/layout';
function ControlDashboardHeader() {
  const theme = useTheme();
  const data = useCurrentUser();
  const user = data.user as Administrator;
 const { setSidebarCollapse, sidebarCollapse } = useControlDashboardLayoutContext();
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3, md: 4, xxl: 8 },
        py: { xs: 1.5, sm: 2, md: 2.5 },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'transparent',
      }}
    >
      {/* Left Section */}
      <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 2, md: 3 }}>
        <IconButton
               onClick={() => setSidebarCollapse(p => !p)}
               className="transition-all duration-200 hover:bg-neutral-800/30"
               sx={{ display: { lg: 'none' } }}
             >
               <RiMenuUnfold4Line
                 size={28}
                 className={`transition-all ${
                   sidebarCollapse ? 'text-secondary' : 'text-txt-primary'
                 }`}
               />
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
    </Box>
  );
}

export default ControlDashboardHeader;

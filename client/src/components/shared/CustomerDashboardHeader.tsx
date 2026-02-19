import React from 'react';
import { Avatar, Box, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material';
import { RiMenuUnfoldLine } from 'react-icons/ri';
import ToggleThemeMode from '../ui/ToggleThemeMode';
import { useCurrentUser } from '@/provider/CurrentUserProvider';
import { Customer } from '@/types/customer.type';
import NotificationBar from '../ui/NotificationBar';
import { useCustomerDashboardLayoutContext } from '@/app/(customer-dashboard)/layout';

function CustomerDashboardHeader() {
  const theme = useTheme();
  const data = useCurrentUser();
  const user = data.user as Customer;
  const { sidebarCollapse, setSidebarCollapse } = useCustomerDashboardLayoutContext();
  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2, md: 3 },
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
          sx={{
            display: {
              lg: 'none',
            },
          }}
          onClick={() => setSidebarCollapse(p => !p)}
          color={sidebarCollapse ? 'primary' : 'secondary'}
        >
          <RiMenuUnfoldLine size={24} />
        </IconButton>

        <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 1.5, md: 1 }}>
          <Avatar
            alt={user?.name?.first}
            src={user?.profilePicture}
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
              {user?.fullName}
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

export default CustomerDashboardHeader;

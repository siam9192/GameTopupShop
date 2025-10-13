'use client';
import React from 'react';
import { Avatar, Badge, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { LuMessageSquareText } from 'react-icons/lu';
import { RiMenuUnfoldLine } from 'react-icons/ri';
import ToggleThemeMode from '../ui/ToggleThemeMode';
import NotificationBar from '../ui/NotificationBar';
import { useCurrentUser } from '@/provider/CurrentUserProvider';
import { Administrator } from '@/types/administrator.type';

function ControlDashboardHeader() {
  const data = useCurrentUser();
  const user = data.user as Administrator;
  return (
    <header className=" p-3 lg:p-5  w-full">
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack direction={'row'} gap={2}>
          <IconButton style={{ color: 'text.primary' }}>
            <RiMenuUnfoldLine size={28} />
          </IconButton>

          <Stack direction={'row'} gap={1.5} alignItems={'center'}>
            <Avatar
              variant="rounded"
              alt="Remy Sharp"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyW2MAFrFnfa_bT1jSttLbmvfotJcqQyCCGg&s"
              sx={{
                width: {
                  sm: 30,
                  md: 45,
                },
                height: {
                  sm: 30,
                  md: 45,
                },

                display: {
                  xs: 'none',
                  md: 'block',
                },
              }}
            />
            <div>
              <Typography
                color="secondary"
                fontSize={{
                  xs: 20,
                  md: 24,
                  lg: 28,
                }}
                variant="h5"
                fontFamily={'jost'}
                fontWeight={600}
              >
                Welcome,
              </Typography>
              <Typography color="text.primary" variant="h6" fontFamily={'jost'} fontWeight={600}>
                {user?.name.first} ({user?.level?.replace('_', '')})
              </Typography>
            </div>
          </Stack>
        </Stack>
        <Stack
          direction={'row'}
          alignItems={'center'}
          gap={{
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
          }}
        >
          <Badge badgeContent={4} color="secondary" className="text-txt-primary">
            <LuMessageSquareText size={28} />
          </Badge>
          <NotificationBar />
          <ToggleThemeMode />
        </Stack>
      </Stack>
    </header>
  );
}

export default ControlDashboardHeader;

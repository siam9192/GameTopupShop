'use client';

import { Avatar, Box, IconButton, Stack, Skeleton } from '@mui/material';
import React from 'react';
import { RiMenuUnfold4Line } from 'react-icons/ri';
import useCommonLayoutContext from '@/context/useCommonLayoutContext';
import ToggleThemeMode from '../ui/ToggleThemeMode';
import SearchInput from '../ui/SearchInput';
import NotificationBar from '../ui/NotificationBar';
import { useCurrentUser } from '@/provider/CurrentUserProvider';
import Link from 'next/link';
import ResponsiveProductsSearchInput from '../ui/ResponsiveSearchInput';

function Header() {
  const { setSidebarCollapse, sidebarCollapse } = useCommonLayoutContext();
  const { user, isLoading: userLoading } = useCurrentUser();

  const isLoading = userLoading;

  return (
    <header className="py-3 lg:py-5 w-full backdrop-blur bg-transparent sticky top-0 z-50">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* LEFT SECTION — Menu Button + Search */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          {/* Sidebar Toggle */}
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} sx={{ display: { lg: 'none' } }} />
          ) : (
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
          )}

          {/* Main Search */}

          <SearchInput />
        </Stack>

        {/* RIGHT SECTION — Search, Notifications, Theme, User */}
        <Stack direction="row" alignItems="center" gap={{ xs: 0.5, sm: 1, md: 2 }}>
          {/* Responsive Search */}
          {isLoading ? (
            <Skeleton variant="circular" width={36} height={36} />
          ) : (
            <ResponsiveProductsSearchInput />
          )}

          {/* Notifications */}
          {isLoading ? (
            <Skeleton variant="circular" width={36} height={36} />
          ) : user ? (
            <NotificationBar />
          ) : null}

          {/* Theme Switch */}

          {/* USER PROFILE */}
          {isLoading ? (
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <Skeleton variant="text" width={100} height={24} />
              <Skeleton variant="circular" width={30} height={30} />
            </Stack>
          ) : user ? (
            <Link href="/dashboard">
              <Box className="cursor-pointer">
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={2}
                  className="
                    px-3 py-1.5 
                    rounded-full border border-secondary/50 
                    hover:border-secondary transition-all duration-200 
                    shadow-sm hover:shadow-md
                  "
                  sx={{ display: { xs: 'none', md: 'flex' } }}
                >
                  <span className="font-semibold text-base text-txt-primary font-secondary">
                    {user.fullName}
                  </span>

                  <Avatar
                    src={user.profilePicture}
                    alt=""
                    sx={{
                      width: 34,
                      height: 34,
                      border: '2px solid var(--secondary-color)',
                    }}
                  />
                </Stack>
              </Box>
            </Link>
          ) : null}

          <ToggleThemeMode />
        </Stack>
      </Stack>
    </header>
  );
}

export default Header;

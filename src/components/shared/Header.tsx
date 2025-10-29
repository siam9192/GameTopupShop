'use client';

import { Avatar, Box, IconButton, Stack, useTheme } from '@mui/material';
import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { RiMenuUnfold4Line, RiMenuUnfoldLine } from 'react-icons/ri';
import useCommonLayoutContext from '@/context/useCommonLayoutContext';
import ToggleThemeMode from '../ui/ToggleThemeMode';
import SearchInput from '../ui/SearchInput';
import NotificationBar from '../ui/NotificationBar';
import { useCurrentUser } from '@/provider/CurrentUserProvider';
import Link from 'next/link';
import ResponsiveProductsSearchInput from '../ui/ResponsiveSearchInput';

function Header() {
  const { setSidebarCollapse } = useCommonLayoutContext();
  const { sidebarCollapse } = useCommonLayoutContext();

  const { user } = useCurrentUser();
  return (
    <header className=" py-3 lg:py-5 w-full ">
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack direction={'row'} spacing={1}>
          <IconButton
            onClick={() => setSidebarCollapse(p => !p)}
            style={{
              color: sidebarCollapse ? 'var(--secondary-color)' : 'text.primary',
            }}
            sx={{
              display: {
                lg: 'none',
              },
            }}
          >
            <RiMenuUnfold4Line size={28} />
          </IconButton>

          <SearchInput />
        </Stack>

        <Stack
          direction={'row'}
          alignItems={'center'}
          gap={{
            xs: 0.5,
            sm: 1,
            md: 2,
          }}
        >
          <ResponsiveProductsSearchInput />
          <NotificationBar />
          <ToggleThemeMode />
          {user ? (
            <Link href={'/dashboard'}>
              <Box>
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  gap={2}
                  display={{
                    xs: 'none',
                    md: 'flex',
                  }}
                  className="border-2 border-secondary rounded-full p-2 text-txt-primary hidden "
                >
                  <span className="font-semibold text-lg  font-secondary">{user?.fullName}</span>
                  <Avatar
                    style={{ width: 30, height: 30 }}
                    variant="circular"
                    src={user.profilePicture}
                  />
                </Stack>
              </Box>
            </Link>
          ) : null}
        </Stack>
      </Stack>
    </header>
  );
}

export default Header;

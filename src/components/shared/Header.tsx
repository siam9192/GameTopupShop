'use client';

import { Badge, IconButton, Stack, useTheme } from '@mui/material';
import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { VscBell } from 'react-icons/vsc';
import { LuMessageSquareText } from 'react-icons/lu';
import { FaRegUserCircle } from 'react-icons/fa';
import { RiMenuUnfold4Line, RiMenuUnfoldLine } from 'react-icons/ri';
import useCommonLayoutContext from '@/context/useCommonLayoutContext';
import ToggleThemeMode from '../ui/ToggleThemeMode';
import SearchInput from '../ui/SearchInput';

function Header() {
  const { setSidebarCollapse } = useCommonLayoutContext();
  const { sidebarCollapse } = useCommonLayoutContext();

  return (
    <header className=" py-3 lg:py-5 w-full ">
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack direction={'row'} spacing={1}>
          <IconButton
            onClick={() => setSidebarCollapse(p => !p)}
            style={{
              color: sidebarCollapse ? 'var(--secondary-color)' : 'text.primary',
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
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
          }}
        >
          <IconButton
            color="secondary"
            sx={{
              display: {
                md: 'none',
              },
            }}
          >
            <FiSearch size={28} />
          </IconButton>

          <Badge badgeContent={4} color="secondary" className="text-txt-primary">
            <LuMessageSquareText size={28} />
          </Badge>
          <Badge badgeContent={4} color="primary" className="text-txt-primary">
            <VscBell size={28} />
          </Badge>
          <ToggleThemeMode />

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
            <span className="font-semibold text-lg  font-secondary">MRS.Jasmine</span>
            <FaRegUserCircle size={28} />
          </Stack>
        </Stack>
      </Stack>
    </header>
  );
}

export default Header;

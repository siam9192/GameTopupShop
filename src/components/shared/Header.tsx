'use client';

import { Badge, IconButton, Stack, useTheme } from '@mui/material';
import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { VscBell } from 'react-icons/vsc';
import { LuMessageSquareText } from 'react-icons/lu';
import { FaRegUserCircle } from 'react-icons/fa';
import { RiMenuUnfoldLine } from 'react-icons/ri';
import useCommonLayoutContext from '@/context/useCommonLayoutContext';
import ToggleThemeMode from '../ui/ToggleThemeMode';

function Header() {
  const { setSidebarCollapse } = useCommonLayoutContext();

  return (
    <header className=" py-2 lg:py-5 w-full">
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack
          sx={{
            display: {
              xs: 'none', // default for mobile
              sm: 'none', // optional, but keeps it hidden on small
              md: 'flex', // visible from medium and up
            },
          }}
          direction={'row'}
          width={400}
          alignItems={'center'}
          gap={1}
          className="bg-secondary/10 px-2 py-3 rounded-lg "
        >
          <span className="text-2xl font-medium text-txt-primary">
            <FiSearch />
          </span>
          <input
            type="text"
            className="grow bg-transparent border-none outline-none font-secondary  font-medium text-gray-950 dark:text-gray-100 placeholder:text-primary"
            placeholder="Search games.."
          />
        </Stack>

        <Stack
          direction={'row'}
          gap={1}
          sx={{
            display: {
              lg: 'none',
            },
          }}
        >
          <IconButton onClick={() => setSidebarCollapse(p => !p)} style={{ color: 'text.primary' }}>
            <RiMenuUnfoldLine size={28} />
          </IconButton>
          <img
            className="w-32 "
            src="https://jubaly.com/wp-content/uploads/2022/01/Untitled-13-TB-for-Website-Use.png"
            alt=""
          />
          
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
            <IconButton color="secondary"  sx={{
               display:{
                md:'none',
               }
            }}>
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
              xs:'none',
              md:'flex'
            }}
            className="border-2 border-secondary rounded-full p-2 text-txt-primary hidden "
          >
            <span className="font-semibold text-lg  font-secondary">
              MRS.Jasmine
            </span>
            <FaRegUserCircle size={28} />
          </Stack>
        </Stack>
      </Stack>
    </header>
  );
}

export default Header;

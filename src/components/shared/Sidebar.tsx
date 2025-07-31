'use client';
import React from 'react';
import { HiOutlineHome } from 'react-icons/hi2';
import { IoGameControllerOutline, IoSettingsOutline } from 'react-icons/io5';
import { FaHeadset } from 'react-icons/fa6';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';
import { BiSolidOffer } from 'react-icons/bi';
import { RiMenuUnfold4Line } from 'react-icons/ri';
import useCommonLayoutContext from '@/context/useCommonLayoutContext';
import Link from 'next/link';

function Sidebar() {
  const routes1 = [
    {
      title: 'Home',
      icon: HiOutlineHome,
      path: '/',
    },
    {
      title: 'Games',
      icon: IoGameControllerOutline,
      path: '/games',
    },
    {
      title: 'Offers',
      icon: BiSolidOffer,
      path: '/offers',
    },
  ];
  const routes2 = [
    {
      title: 'Support',
      icon: FaHeadset,
      path: '',
    },
    {
      title: 'Settings',
      icon: IoSettingsOutline,
      path: '',
    },
  ];
  const { sidebarCollapse, setSidebarCollapse } = useCommonLayoutContext();

  const collapse = sidebarCollapse;

  return (
    <div
      className={` w-full rounded-lg h-full ${collapse ? 'py-8 px-5' : 'py-5 px-10'}     dark:bg-[#0F0F0F] bg-black relative `}
    >
      {collapse === false ? (
        <h1 className="text-3xl font-medium  text-white">
          <span className="text-4xl text-primary font-semibold">Game</span>TopUp
        </h1>
      ) : null}

      <IconButton
        onClick={() => setSidebarCollapse(p => !p)}
        sx={{
          display: {
            sm: 'none',
            lg: 'block',
          },
        }}
        style={{
          color: collapse ? 'var(--secondary-color)' : 'white',
          position: 'absolute',
          top: 2,
          right: 2,
        }}
      >
        <RiMenuUnfold4Line size={28} />
      </IconButton>

      {collapse === false ? (
        <img
          className="w-[60%] hidden"
          src="https://jubaly.com/wp-content/uploads/2022/01/Untitled-13-TB-for-Website-Use.png"
          alt=""
        />
      ) : null}
      <Stack direction={'column'} justifyContent={'space-between'} height={'90%'}>
        <Stack direction={'column'} spacing={4} fontFamily={'Open Sans'} color={'primary'}>
          <List>
            {routes1.map(route => (
              <Link href={route.path} key={route.title}>
                <ListItem className="p-2  text-white hover:text-secondary hover:scale-105 duration-75 hover:cursor-pointer">
                  <ListItemIcon>
                    <route.icon color="white" size={28} />
                  </ListItemIcon>
                  <ListItemText disableTypography className=" font-primary  font-semibold text-lg">
                    {route.title}
                  </ListItemText>
                </ListItem>
              </Link>
            ))}
          </List>
        </Stack>

        <List>
          {routes2.map(route => (
            <ListItem
              key={route.title}
              className="p-2  text-white hover:text-secondary hover:scale-105 duration-75 hover:cursor-pointer"
            >
              <ListItemIcon>
                <route.icon color="white" size={28} />
              </ListItemIcon>
              <ListItemText className="font-primary  font-semibold text-lg">
                {route.title}
              </ListItemText>
            </ListItem>
          ))}
          <ListItem>
            <Avatar
              alt="Remy Sharp"
              variant="rounded"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyW2MAFrFnfa_bT1jSttLbmvfotJcqQyCCGg&s"
            />
            <ListItemText className="text-white font-primary  font-semibold text-lg ml-4">
              MRS. Jasmine
            </ListItemText>
          </ListItem>
        </List>
      </Stack>
    </div>
  );
}

export default Sidebar;

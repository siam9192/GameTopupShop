'use client';
import React from 'react';
import { HiOutlineHome } from 'react-icons/hi2';
import { IoGameControllerOutline, IoSettingsOutline } from 'react-icons/io5';
import { FaHeadset } from 'react-icons/fa6';
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { BiSolidOffer } from 'react-icons/bi';
import Link from 'next/link';
import { CiLogout } from 'react-icons/ci';
import { useCurrentUser } from '@/provider/CurrentUserProvider';
import { useAppSettings } from '@/provider/AppSettingsProvider';
import { logout } from '@/api-services/auth';
import { queryClient } from '@/provider/Provider';
function Sidebar() {
  const routes1 = [
    {
      title: 'Home',
      icon: HiOutlineHome,
      path: '/',
    },
    {
      title: 'Top-ups',
      icon: IoGameControllerOutline,
      path: '/topups',
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
      path: '/support',
    },
    // {
    //   title: 'Dashboard',
    //   icon: RxDashboard,
    //   path: '/dashboard',
    // },
  ];

  const { user } = useCurrentUser();
  const { settings } = useAppSettings();

  async function handelLogout() {
    await logout();
     queryClient.invalidateQueries({ queryKey: ['getCurrentUser'] });
  }

  return (
    <div className={` w-full h-full py-5 px-10    dark:bg-[#0F0F0F] bg-black relative `}>
      <Typography
        variant="h4"
        color="primary"
        align="center"
        fontWeight={600}
        fontFamily="jost"
        mb={2}
      >
        {settings?.name}
      </Typography>

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
          {user ? (
           <>
            <Link href="/dashboard">
              <ListItem>
                <Avatar alt="" variant="rounded" src={user.profilePicture} />
                <ListItemText className="text-white font-primary  font-semibold text-lg ml-4">
                  {user.fullName}
                </ListItemText>
              </ListItem>
            </Link>
       <ListItem>
            <ListItemIcon>
              <CiLogout size={22} color="white" />
            </ListItemIcon>
    
             <ListItemText
              onClick={handelLogout}
              className="text-sm text-gray-300 hover:text-red-600 hover:cursor-pointer "
            >
              Logout
            </ListItemText>
            
    
          </ListItem>
           </>
          ) : null}
   
        </List>
      </Stack>
    </div>
  );
}

export default Sidebar;

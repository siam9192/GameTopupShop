'use client';
import React, { useState } from 'react';
import { HiOutlineHome } from 'react-icons/hi2';
import { IoGameControllerOutline } from 'react-icons/io5';
import { FaHeadset } from 'react-icons/fa6';
import { GrUserAdmin } from 'react-icons/gr';
import { LuLogIn } from 'react-icons/lu';
import { BiSolidOffer } from 'react-icons/bi';
import { CiLogout } from 'react-icons/ci';

import Link from 'next/link';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Skeleton,
  Divider,
  Typography,
  ListItemButton,
  Avatar,
} from '@mui/material';

import { useCurrentUser } from '@/provider/CurrentUserProvider';
import { useAppSettings } from '@/provider/AppSettingsProvider';

import { usePathname } from 'next/navigation';
import LogoutDialog from '../ui/LogoutDialog';

const routesMain = [
  { title: 'Home', icon: HiOutlineHome, path: '/' },
  { title: 'Top-ups', icon: IoGameControllerOutline, path: '/top-ups' },
  { title: 'Offers', icon: BiSolidOffer, path: '/offers' },
];

const routesSecondary = [{ title: 'Support', icon: FaHeadset, path: '/support' }];

const skeletonSx = (theme: any) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? 'rgba(0,0,0,0.1)' // visible on white
      : 'rgba(255,255,255,0.1)', // visible on dark
});

const SkeletonItem = () => (
  <ListItem className="py-3">
    <ListItemIcon>
      <Skeleton variant="circular" width={30} height={30} sx={skeletonSx} />
    </ListItemIcon>
    <ListItemText>
      <Skeleton width={90} height={26} sx={skeletonSx} />
    </ListItemText>
  </ListItem>
);

const RouteItem = ({
  title,
  Icon,
  path,
  active,
}: {
  title: string;
  Icon: any;
  path?: string;
  active?: boolean;
}) => {
  const Wrapper = path ? Link : React.Fragment;

  const WrapperProps = path ? { href: path } : {};

  return (
    <Wrapper {...(WrapperProps as any)}>
      <ListItem
        className={`
          group 
          py-3 px-2 rounded-xl 
          cursor-pointer 
          flex items-center
          transition-all duration-200
          text-white 
          ${active ? 'bg-neutral-800 text-secondary' : 'hover:bg-neutral-800/60'}
        `}
      >
        <div
          className={`h-5 w-1 rounded-full mr-3 transition-all ${
            active ? 'bg-secondary' : 'group-hover:bg-neutral-600'
          }`}
        ></div>

        <ListItemIcon className="!min-w-[36px]">
          <Icon size={26} color={active ? '#fb923c' : 'white'} />
        </ListItemIcon>

        <ListItemText
          className={`text-lg font-medium ${
            active ? 'text-secondary' : 'group-hover:text-secondary'
          }`}
        >
          {title}
        </ListItemText>
      </ListItem>
    </Wrapper>
  );
};

const UserSection = ({ user }: { user: any }) => {
  if (!user) return null;
  const [logoutDialog, setLogoutDialog] = useState(false);
 
  const isAdmin =  Object.hasOwn(user,"level")

  return (
    <>
      <Divider sx={{ my: 2, borderColor: '#333' }} />

 {
  isAdmin ?

       <Link href="/control-dashboard">
        <ListItem className="py-3 cursor-pointer rounded-xl hover:bg-neutral-800/60 transition-all duration-200">
          <Avatar alt="" variant="rounded" src={user.profilePicture} />
          <ListItemText className="text-white font-semibold text-lg ml-4">
            Control Dashboard
          </ListItemText>
        </ListItem>
      </Link>
  :
       <Link href="/dashboard">
        <ListItem className="py-3 cursor-pointer rounded-xl hover:bg-neutral-800/60 transition-all duration-200">
          <Avatar alt="" variant="rounded" src={user.profilePicture} />
          <ListItemText className="text-white font-semibold text-lg ml-4">
            {user.fullName}
          </ListItemText>
        </ListItem>
      </Link>
 }

      <ListItemButton
        onClick={() => setLogoutDialog(true)}
        className="group 
          py-3 px-2 rounded-xl 
          cursor-pointer 
          flex items-center
          transition-all duration-200"
      >
        <ListItemIcon>
          <CiLogout size={22} color="white" />
        </ListItemIcon>
        <ListItemText className="text-sm text-gray-300 hover:text-red-600 hover:cursor-pointer ">
          Logout
        </ListItemText>
      </ListItemButton>
      {logoutDialog ? <LogoutDialog /> : null}
    </>
  );
};

function Sidebar() {
  const { user, isLoading: userLoading } = useCurrentUser();
  const { settings, queryResult } = useAppSettings();
  const settingsLoading = queryResult.isLoading;
  const pathname = usePathname();

  return (
    <div className="w-full h-full py-6 px-8 bg-[#0F0F0F] dark:bg-[#0F0F0F] flex flex-col relative">
      {/* App Logo */}
      <div className="flex justify-center mb-8">
        {settingsLoading ? (
          <Skeleton width={130} height={50} />
        ) : (
          <Typography color="primary" variant="h4" fontWeight={'600'}>
            {settings?.name}
          </Typography>
        )}
      </div>

      {/* Main Content */}
      <Stack direction="column" justifyContent="space-between" height="100%">
        {/* Main Routes */}
        <Stack direction="column" spacing={3}>
          <List>
            {settingsLoading || userLoading
              ? routesMain.map(r => <SkeletonItem key={r.title} />)
              : routesMain.map(r => (
                  <RouteItem
                    key={r.title}
                    title={r.title}
                    Icon={r.icon}
                    path={r.path}
                    active={pathname === r.path}
                  />
                ))}
          </List>
        </Stack>

        {/* Bottom Section */}
        <List>
          {/* Support */}
          {settingsLoading || userLoading
            ? routesSecondary.map(r => <SkeletonItem key={r.title} />)
            : routesSecondary.map(r => (
                <RouteItem key={r.title} title={r.title} Icon={r.icon} path={r.path} />
              ))}

          {/* User Section */}
          {userLoading ? (
            <>
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
            </>
          ) : user ? (
            <UserSection user={user} />
          ) : (
            <>
              <Link href="/signin">
                <RouteItem title="Signin" Icon={LuLogIn} />
              </Link>
              <Link href="/administrator-signin">
                <RouteItem title="Admin Signin" Icon={GrUserAdmin} />
              </Link>
            </>
          )}
        </List>
      </Stack>
    </div>
  );
}

export default Sidebar;

'use client';
import {
  List,
  ListItemIcon,
  ListItemText,
  Typography,
  ListItem,
  Stack,
  ListItemButton,
} from '@mui/material';
import { useState } from 'react';

import React from 'react';
import { TbRecharging } from 'react-icons/tb';
import { BiHomeAlt } from 'react-icons/bi';
import { HiOutlineWallet } from 'react-icons/hi2';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdManageAccounts } from 'react-icons/md';
import { IconType } from 'react-icons';
import { useAppSettings } from '@/provider/AppSettingsProvider';
import SidebarItem from '../ui/SidebarItem';
import { CiLogout } from 'react-icons/ci';
import LogoutDialog from '../ui/LogoutDialog';

interface RouteItem {
  label: string;
  path?: string;
  icon?: IconType;
  children?: RouteItem[];
}

const sidebarRoutesGroup1: RouteItem[] = [
  {
    label: 'Home',
    path: '/dashboard',
    icon: BiHomeAlt,
  },

  {
    label: 'My Orders',
    path: '/dashboard/orders',
    icon: TbRecharging,
  },
  {
    label: 'My Wallet',
    icon: HiOutlineWallet,
    children: [
      { label: 'Wallet', path: '/dashboard/wallet' },
      { label: 'Add Balance', path: '/dashboard/wallet/add-balance' },
      { label: 'Wallet History', path: '/dashboard/wallet/history' },
      { label: 'Submissions', path: '/dashboard/wallet/submissions' },
    ],
  },
];

const sidebarRoutesGroup2: RouteItem[] = [
  {
    label: 'Settings',
    path: '/dashboard/settings',
    icon: IoSettingsOutline,
  },

  {
    label: 'Manage Accounts',
    path: '/dashboard/manage-account',
    icon: MdManageAccounts,
  },
  {
    label: 'Main Home',
    path: '/',
    icon: IoHomeOutline,
  },
];
function CustomerDashboardSidebar() {
  const [isLogoutDialog, setIsLogoutDialog] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const { settings } = useAppSettings();

  return (
    <div className="w-full h-full dark:bg-[#0d1120] bg-black py-5 px-3">
      <Stack direction="column" className="h-full" justifyContent="space-between">
        <div>
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

          <List>
            {sidebarRoutesGroup1.map(route => (
              <SidebarItem
                key={route.label}
                route={route}
                isOpen={openMenus[route.label]}
                toggleMenu={toggleMenu}
              />
            ))}
          </List>
        </div>

        <List>
          {sidebarRoutesGroup2.map(route => (
            <SidebarItem
              key={route.label}
              route={route}
              isOpen={openMenus[route.label]}
              toggleMenu={toggleMenu}
            />
          ))}
          <ListItemButton onClick={() => setIsLogoutDialog(true)}>
            <ListItemIcon>
              <CiLogout size={22} color="white" />
            </ListItemIcon>
            <ListItemText className="text-sm text-gray-300 hover:text-red-600 hover:cursor-pointer ">
              Logout
            </ListItemText>
          </ListItemButton>
        </List>

        {isLogoutDialog ? <LogoutDialog onClose={() => setIsLogoutDialog(false)} /> : null}
      </Stack>
    </div>
  );
}

export default CustomerDashboardSidebar;

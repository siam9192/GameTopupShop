'use client';

import React, { useState } from 'react';
import { List, Typography, Stack, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { MdAppSettingsAlt, MdManageAccounts, MdOutlinePayment } from 'react-icons/md';
import { TbRecharging } from 'react-icons/tb';
import { FaTruckFast, FaUsers } from 'react-icons/fa6';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { SiTaichigraphics } from 'react-icons/si';
import { AdministratorLevel } from '@/types/user.type';
import { ALL_ADMINISTRATORS_LEVEL } from '@/utils/constant';
import { useCurrentUser } from '@/provider/CurrentUserProvider';
import { Administrator } from '@/types/administrator.type';
import { BiHomeAlt } from 'react-icons/bi';
import { HiOutlineWallet } from 'react-icons/hi2';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { RouteItem } from '@/types/utils.type';
import SidebarItem from '../ui/SidebarItem';
import { CiLogout } from 'react-icons/ci';
import { logout } from '@/api-services/auth';
import { useRouter } from 'next/navigation';
import { useAppSettings } from '@/provider/AppSettingsProvider';

// ---------------------- Sidebar Data ----------------------
const sidebarRoutesGroup1: RouteItem[] = [
  {
    label: 'Home',
    path: '/control-dashboard',
    roles: ALL_ADMINISTRATORS_LEVEL,
    icon: BiHomeAlt,
  },
  {
    label: 'Orders',
    path: '/control-dashboard/orders',
    roles: ALL_ADMINISTRATORS_LEVEL,
    icon: FaTruckFast,
  },
  {
    label: 'Products',
    icon: TbRecharging,
    path: '/control-dashboard/products', 
    roles: ALL_ADMINISTRATORS_LEVEL,
    children: [
      { label: 'Top Ups', path: '/control-dashboard/products/top-up' },
      { label: 'Offers', path: '/control-dashboard/products/offers' },
      { label: 'Add Top Up', path: '/control-dashboard/products/add/top-up' },
      { label: 'Add Offer', path: '/control-dashboard/products/add/offer' },
    ],
  },
  {
    label: 'Wallet',
    icon: HiOutlineWallet,
    roles: [AdministratorLevel.SUPER_ADMIN, AdministratorLevel.ADMIN],
    children: [
      { label: 'Customers Wallet', path: '/control-dashboard/wallet/customers' },
      { label: 'Submissions', path: '/control-dashboard/wallet/submissions' },
    ],
  },
  {
    label: 'Users',
    icon: FaUsers,
    roles: [AdministratorLevel.SUPER_ADMIN, AdministratorLevel.ADMIN],
    children: [
      { label: 'Customers', path: '/control-dashboard/users/customers' },
      {
        label: 'Administrators',
        roles: [AdministratorLevel.SUPER_ADMIN],
        path: '/control-dashboard/users/administrators',
      },
      {
        label: 'Add Administrator',
        roles: [AdministratorLevel.SUPER_ADMIN],
        path: '/control-dashboard/users/add/administrator',
      },
    ],
  },
  {
    label: 'Transactions',
    icon: MdOutlinePayment,
    roles: [AdministratorLevel.SUPER_ADMIN, AdministratorLevel.ADMIN],
    children: [{ label: 'All', path: '/control-dashboard/transactions/all' }],
  },
  {
    label: 'Pay Methods',
    icon: RiSecurePaymentLine,
    roles: [AdministratorLevel.SUPER_ADMIN, AdministratorLevel.ADMIN],
    children: [
      { label: 'Manual', path: '/control-dashboard/payment-methods/manual' },
      { label: 'Live', path: '/control-dashboard/payment-methods/live' },
    ],
  },
  {
    label: 'Appearances',
    icon: SiTaichigraphics,
    roles: ALL_ADMINISTRATORS_LEVEL,
    children: [{ label: 'Banner Slides', path: '/control-dashboard/appearances/banner' }],
  },
];

const sidebarRoutesGroup2: RouteItem[] = [
  {
    label: 'App Setting',
    path: '/control-dashboard/app-settings',
    roles: [AdministratorLevel.SUPER_ADMIN],
    icon: MdAppSettingsAlt,
  },
  {
    label: 'Settings',
    path: '/control-dashboard/settings',
    roles: ALL_ADMINISTRATORS_LEVEL,
    icon: IoSettingsOutline,
  },
  {
    label: 'Manage Account',
    path: '/control-dashboard/manage-account',
    roles: ALL_ADMINISTRATORS_LEVEL,
    icon: MdManageAccounts,
  },
  {
    label: 'Main Home',
    path: '/',
    roles: ALL_ADMINISTRATORS_LEVEL,
    icon: IoHomeOutline,
  },
];

// ---------------------- Sidebar Component ----------------------
function ControlDashboardSidebar() {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const { user } = useCurrentUser();
  const level = (user as Administrator)?.level;
  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };
  // Filter routes (including children) by admin level
  const filterRoutes = (routes: RouteItem[]) =>
    routes
      .filter(r => !r.roles || r.roles.includes(level))
      .map(r => ({
        ...r,
        children: r.children?.filter(c => !c.roles || c.roles.includes(level)),
      }));

  const visibleGroup1 = filterRoutes(sidebarRoutesGroup1);
  const visibleGroup2 = filterRoutes(sidebarRoutesGroup2);

  const router = useRouter();

  async function handelLogout() {
    await logout();
    router.replace('/');
  }

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
            {visibleGroup1.map(route => (
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
          {visibleGroup2.map(route => (
            <SidebarItem
              key={route.label}
              route={route}
              isOpen={openMenus[route.label]}
              toggleMenu={toggleMenu}
            />
          ))}
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
        </List>
      </Stack>
    </div>
  );
}

export default ControlDashboardSidebar;

'use client';
import {
  List,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  ListItem,
  Stack,
  IconButton,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState } from 'react';

import React from 'react';
import { TbRecharging } from 'react-icons/tb';
import { usePathname, useRouter } from 'next/navigation';
import { BiHomeAlt } from 'react-icons/bi';
import { HiOutlineWallet } from 'react-icons/hi2';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdAppSettingsAlt, MdManageAccounts, MdOutlinePayment } from 'react-icons/md';
import { IconType } from 'react-icons';
import { SiTaichigraphics } from 'react-icons/si';
import { FaTruckFast } from 'react-icons/fa6';
import { FaUsers } from 'react-icons/fa';

interface RouteItem {
  label: string;
  path?: string;
  icon?: IconType;
  children?: RouteItem[];
}

const sidebarRoutesGroup1: RouteItem[] = [
  {
    label: 'Home',
    path: '/control-dashboard',
    icon: BiHomeAlt,
  },

  {
    label: 'Orders',
    path: '/control-dashboard/orders',
    icon: FaTruckFast,
  },
  {
    label: 'Products',
    path: '/control-dashboard/products',
    icon: TbRecharging,
    children: [
      { label: 'Top ups', path: '/control-dashboard/products/top-up' },
      { label: 'Offers', path: '/control-dashboard/products/top-up' },
      { label: 'Add Top Up', path: '/control-dashboard/products/add/top-up' },
      { label: 'Add Offer', path: '/control-dashboard/products/add/offer' },
    ],
  },

  {
    label: 'Wallet',
    icon: HiOutlineWallet,
    path: '/control-dashboard/wallet',
    children: [
      { label: 'Customers Wallet', path: '/control-dashboard/wallet/transactions' },
      { label: 'Submissions', path: '/control-dashboard/wallet/transactions' },
      { label: 'Config Payment Methods', path: '/control-dashboard/wallet/payment-methods' },
    ],
  },
  {
    label: 'Users',
    icon: FaUsers,
    path: '/control-dashboard/users',
    children: [
      { label: 'Customers', path: '/control-dashboard/users/customers' },
      { label: 'Administrators', path: '/control-dashboard/users/administrators' },
    ],
  },
  {
    label: 'Transactions',
    icon: MdOutlinePayment,
    path: '/control-dashboard/transactions',
    children: [
      { label: 'All Payments', path: '/control-dashboard/transactions/all' },
      { label: 'Payment Methods', path: '/control-dashboard/transactions/methods' },
    ],
  },
  {
    label: 'Appearances',
    path: '/control-dashboard/appearances',
    icon: SiTaichigraphics,
    children: [
      { label: 'Banner Slides', path: '/control-dashboard/appearances/banner' },
      { label: 'Branding', path: '/control-dashboard/appearances/branding' },
    ],
  },
];

const sidebarRoutesGroup2: RouteItem[] = [
  {
    label: 'App Setting',
    path: '/control-dashboard/app-settings',
    icon: MdAppSettingsAlt,
  },
  {
    label: 'Setting',
    path: '/control-dashboard/settings',
    icon: IoSettingsOutline,
  },

  {
    label: 'Manage Account',
    path: '/control-dashboard/manage-account',
    icon: MdManageAccounts,
  },
  {
    label: 'Main Home',
    path: '/',
    icon: IoHomeOutline,
  },
];
interface SidebarItemProps {
  route: RouteItem;
  isOpen: boolean;
  toggleMenu: (label: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ route, isOpen, toggleMenu }) => {
  const router = useRouter();
  const hasChildren = !!route.children && route.children.length > 0;

  return (
    <div key={route.label}>
      {/* Parent Item */}
      <ListItem
        className="p-2 text-white hover:text-secondary hover:scale-105 duration-75 hover:cursor-pointer"
        onClick={() => {
          if (route.path) {
            router.push(route.path);
          }
        }}
      >
        {route.icon && (
          <ListItemIcon>
            <route.icon size={28} color="white" />
          </ListItemIcon>
        )}
        <ListItemText disableTypography className="font-primary font-semibold text-lg">
          {route.label}
        </ListItemText>
        {hasChildren && (
          <IconButton
            onClick={e => {
              e.stopPropagation();
              toggleMenu(route.label);
            }}
            color="primary"
          >
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      </ListItem>

      {/* Children */}
      {hasChildren && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {route.children?.map(child => (
              <ListItem
                key={child.label}
                className="hover:text-secondary hover:cursor-pointer"
                onClick={() => router.push(child.path!)}
              >
                <ListItemText disableTypography className="text-white">
                  {child.label}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </div>
  );
};

function ControlDashboardSidebar() {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="w-full h-full dark:bg-[#0d1120] bg-black  py-5 px-3 ">
      <Stack direction={'column'} className="h-full" justifyContent={'space-between'}>
        <div>
          <Typography
            variant="h4"
            color="primary"
            align="center"
            fontWeight={600}
            fontFamily={'jost'}
          >
            GameTop
          </Typography>
          <List>
            {sidebarRoutesGroup1.map(route => {
              return (
                <SidebarItem
                  key={route.label}
                  route={route}
                  isOpen={openMenus[route.label]}
                  toggleMenu={toggleMenu}
                />
              );
            })}
          </List>
        </div>
        <List>
          {sidebarRoutesGroup2.map(route => {
            return (
              <SidebarItem
                key={route.label}
                route={route}
                isOpen={openMenus[route.label]}
                toggleMenu={toggleMenu}
              />
            );
          })}
        </List>
      </Stack>
    </div>
  );
}

export default ControlDashboardSidebar;

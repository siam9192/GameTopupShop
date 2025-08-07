'use client';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  ListItem,
  Stack,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState } from 'react';

import React from 'react';
import { TbRecharging } from 'react-icons/tb';
import { usePathname, useRouter } from 'next/navigation';
import { BiHomeAlt } from 'react-icons/bi';
import { HiOutlineWallet } from 'react-icons/hi2';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdManageAccounts } from 'react-icons/md';
import { IconType } from 'react-icons';

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
    label: 'Orders',
    path: '/dashboard',
    icon: TbRecharging,
    children: [
      { label: 'Orders', path: '/users' },
      { label: 'Order History', path: '/users/add' },
    ],
  },
  {
    label: 'Products',
    path: '/dashboard',
    icon: TbRecharging,
    children: [
      { label: 'Topups', path: '/users' },
      { label: 'Offers', path: '/users/add' },
    ],
  },

  {
    label: 'Wallet',
    icon: HiOutlineWallet,
    children: [
      { label: 'Wallet Submissions', path: '/users' },
      { label: 'All Wallets', path: '/users/add' },
    ],
  },
  {
    label: 'Users',
    path: '/dashboard',
    icon: TbRecharging,
    children: [
      { label: 'Customers', path: '/users' },
      { label: 'Administrators', path: '/users/add' },
    ],
  },
  {
    label: 'Transactions',
    path: '/dashboard',
    icon: TbRecharging,
  },
  {
    label: 'Apearences',
    path: '/dashboard',
    icon: TbRecharging,
  },
];

const sidebarRoutesGroup2: RouteItem[] = [
  {
    label: 'Setting',
    path: '/dashboard',
    icon: IoSettingsOutline,
  },

  {
    label: 'Manage Accounts',
    path: '/dashboard',
    icon: MdManageAccounts,
  },
  {
    label: 'Main Home',
    path: '/dashboard',
    icon: IoHomeOutline,
  },
];
function ControlDashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
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
              const hasChildren = !!route.children?.length;
              const isOpen = openMenus[route.label];

              return (
                <div key={route.label}>
                  <ListItem
                    className="p-2  text-white hover:text-secondary hover:scale-105 duration-75 hover:cursor-pointer"
                    onClick={() => {
                      if (hasChildren) {
                        toggleMenu(route.label);
                      } else if (route.path) {
                        router.push(route.path);
                      }
                    }}
                  >
                    {route.icon && (
                      <ListItemIcon>
                        <route.icon size={32} color="white" />
                      </ListItemIcon>
                    )}
                    <ListItemText
                      disableTypography
                      className=" font-primary   font-semibold text-lg"
                    >
                      {route.label}
                    </ListItemText>

                    {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                  </ListItem>

                  {hasChildren && (
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding sx={{ pl: 4 }}>
                        {route.children?.map(child => (
                          <ListItem key={child.label} onClick={() => router.push(child.path!)}>
                            <ListItemText className="text-white " primary={child.label} />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </div>
              );
            })}
          </List>
        </div>
        <List>
          {sidebarRoutesGroup2.map(route => {
            const hasChildren = !!route.children?.length;
            const isOpen = openMenus[route.label];

            return (
              <div key={route.label}>
                <ListItem
                  className="p-2  text-white hover:text-secondary hover:scale-105 duration-75 hover:cursor-pointer"
                  onClick={() => {
                    if (hasChildren) {
                      toggleMenu(route.label);
                    } else if (route.path) {
                      router.push(route.path);
                    }
                  }}
                >
                  {route.icon && (
                    <ListItemIcon color="primary">
                      <route.icon size={32} color="white" />
                    </ListItemIcon>
                  )}
                  <ListItemText disableTypography className=" font-primary  font-semibold text-lg">
                    {route.label}
                  </ListItemText>

                  {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItem>

                {hasChildren && (
                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ pl: 4 }}>
                      {route.children?.map(child => (
                        <ListItem key={child.label} onClick={() => router.push(child.path!)}>
                          <ListItemText className="text-txt-primary" primary={child.label} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </div>
            );
          })}
        </List>
      </Stack>
    </div>
  );
}

export default ControlDashboardSidebar;

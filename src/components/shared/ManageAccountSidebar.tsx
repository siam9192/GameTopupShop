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
import { IoHomeOutline, IoLockClosed, IoSettingsOutline } from 'react-icons/io5';
import { RiHistoryFill } from 'react-icons/ri';
import { MdManageAccounts } from 'react-icons/md';
import { IconType } from 'react-icons';
import { FaUsersCog } from 'react-icons/fa';
import { TiUserDelete } from 'react-icons/ti';

interface RouteItem {
  label: string;
  path?: string;
  icon?: IconType;
  children?: RouteItem[];
}

const sidebarRoutesGroup1: RouteItem[] = [
  {
    label: 'Personal Info',
    path: '/dashboard',
    icon: FaUsersCog,
  },

  {
    label: 'Password Setting',
    path: '/dashboard',
    icon: IoLockClosed,
    children: [
      { label: 'Change Password', path: '/users' },
      { label: 'Forget Password', path: '/users/add' },
    ],
  },
  {
    label: 'Account Deletion',
    icon: TiUserDelete,
  },
];

function ManageAccountSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="w-full min-h-[600px] dark:bg-[#0d1120] bg-black  p-5 rounded-lg ">
      <Stack direction={'column'} className="h-full" justifyContent={'space-between'}>
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
                    <ListItemIcon color="primary">
                      <route.icon size={32} color="white" />
                    </ListItemIcon>
                  )}
                  <ListItemText disableTypography className=" font-primary  font-semibold text-lg">
                    {route.label}
                  </ListItemText>

                  <ListItemIcon className="ml-2">
                    {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemIcon>
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

export default ManageAccountSidebar;

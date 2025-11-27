'use client';
import { List, ListItemIcon, ListItemText, Collapse, ListItem, Stack } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState } from 'react';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IconType } from 'react-icons';
import { FaUsersCog } from 'react-icons/fa';
import { TiUserDelete } from 'react-icons/ti';
import { IoLockClosed } from 'react-icons/io5';
import SidebarItem from '../ui/SidebarItem';
import { useCurrentUser } from '@/provider/CurrentUserProvider';
import { Customer } from '@/types/customer.type';
import { Provider } from '@/types/user.type';

interface RouteItem {
  label: string;
  path?: string;
  icon?: IconType;
  children?: RouteItem[];
}

interface Props {
  for: 'customer-dashboard' | 'control-dashboard';
}

function ManageAccountSidebar(props: Props) {
  const { user } = useCurrentUser();
  const isCustomer = !Object.hasOwn(user as Object, 'level');

  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };
  const parentPath = props.for === 'control-dashboard' ? '/control-dashboard' : '/dashboard';
  const sidebarRoutesGroup1: RouteItem[] = [
    {
      label: 'Personal Info',
      path: `${parentPath}/manage-account`,
      icon: FaUsersCog,
    },

    ...(isCustomer && (user as Customer).provider === Provider.EMAIL_PASSWORD
      ? [
          {
            label: 'Password Setting',

            icon: IoLockClosed,
            children: [
              { label: 'Change Password', path: `${parentPath}/manage-account/change-password` },
              { label: 'Forget Password', path: `${parentPath}/manage-account/forget-password` },
            ],
          },
        ]
      : []),
    {
      label: 'Account Deletion',
      icon: TiUserDelete,
      path: `${parentPath}/manage-account/account-deletion`,
    },
  ];

  return (
    <div className="w-full min-h-[600px] dark:bg-[#0d1120] bg-black  p-5 rounded-lg ">
      <Stack direction={'column'} className="h-full" justifyContent={'space-between'}>
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
      </Stack>
    </div>
  );
}

export default ManageAccountSidebar;

'use client';
import DashboardOverviewData from '@/components/ui/DashboardOverviewData';
import { getUsersMetadataQuery } from '@/query/services/metadata';
import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { FaUserSlash } from 'react-icons/fa6';
import { PiUserListBold } from 'react-icons/pi';
import { MdAdminPanelSettings } from 'react-icons/md';

function UsersOverviewData() {
  const { data, isLoading } = getUsersMetadataQuery();

  const mapping = [
    {
      key: 'users',
      label: 'Total Users',
      icon: FaUsers, // 👥 All users
    },
    {
      key: 'customers',
      label: 'Customers',
      icon: PiUserListBold, // 🧾 User list / regular users
    },
    {
      key: 'administrators',
      label: 'Administrators',
      icon: MdAdminPanelSettings, // 🛡️ Admins / security feel
    },
    {
      key: 'blockedUsers',
      label: 'Blocked Users',
      icon: FaUserSlash, // 🚫 Clearly represents blocked/banned
    },
  ];
  return <DashboardOverviewData data={data?.data} mapping={mapping} isLoading={isLoading} />;
}

export default UsersOverviewData;

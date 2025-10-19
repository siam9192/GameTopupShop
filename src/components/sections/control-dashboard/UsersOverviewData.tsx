'use client';
import DashboardOverviewData from '@/components/ui/DashboardOverviewData';
import { getUsersMetadataQuery } from '@/query/services/metadata';
import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { FaUserLock, FaUsers, FaUserTag } from 'react-icons/fa';

import { RiAdminFill } from 'react-icons/ri';


function UsersOverviewData() {
  const { data,isLoading } = getUsersMetadataQuery();
  
  const mapping = [
    {
      key: 'users',
       label: 'Total users',
      icon: FaUsers,
    },
    {
      key:'customers',
      label: 'Customers',
      icon: FaUserTag,
    },
    {
      key:'administrators',
      label: 'Administrators',
      icon: RiAdminFill,
    
    },
    {
      key:'blockedUsers',
      label: 'Blocked',
      icon: FaUserLock,
      
    },
  ];
  return (
  <DashboardOverviewData  data={data?.data} mapping={mapping} isLoading={isLoading}/>
  );
}

export default UsersOverviewData;

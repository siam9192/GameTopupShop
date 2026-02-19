import RecentAdministratorActivityCard from '@/components/cards/RecentAdministratorActivityCard';
import DashboardSectionHeading from '@/components/ui/DashboardSectionHeading';
import {
  AdministratorActivity,
  AdministratorActivityAction,
} from '@/types/administrator-activity.type';
import { AdministratorLevel } from '@/types/user.type';
import { Badge, Divider, Stack } from '@mui/material';
import React, { Fragment } from 'react';
import { TbRecharging } from 'react-icons/tb';
const activities: AdministratorActivity[] = [
  {
    _id: '1',
    title: 'New Top-up Added',
    description: 'Added a new Mobile Legends Diamond top-up package.',
    category: 'Top-up Management',
    action: AdministratorActivityAction.CREATE,
    administratorId: 'admin_001',
    administrator: {
      _id: 'admin_001',
      fullName: 'Rakib Hossain',
      email: 'rakib@admin.com',
      level: AdministratorLevel.SUPER_ADMIN,
      profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    createdAt: '2025-10-18T09:12:00.000Z',
    updatedAt: '2025-10-18T09:12:00.000Z',
  } as any,
  {
    _id: '2',
    title: 'Offer Updated',
    description: 'Updated discount rate for PUBG UC Offer.',
    category: 'Offer Management',
    action: AdministratorActivityAction.UPDATE,
    administratorId: 'admin_002',
    administrator: {
      _id: 'admin_002',
      fullName: 'Ayesha Rahman',
      email: 'ayesha@admin.com',
      level: AdministratorLevel.ADMIN,
      profilePicture: 'https://randomuser.me/api/portraits/women/68.jpg',
    } as any,
    createdAt: '2025-10-18T08:45:00.000Z',
    updatedAt: '2025-10-18T08:45:00.000Z',
  },
  {
    _id: '3',
    title: 'Product Deleted',
    description: 'Removed an inactive Free Fire Diamond package.',
    category: 'Product Management',
    action: AdministratorActivityAction.DELETED,
    administratorId: 'admin_003',
    administrator: {
      _id: 'admin_003',
      fullName: 'Tanvir Islam',
      email: 'tanvir@admin.com',
      level: AdministratorLevel.MODERATOR,
      profilePicture: 'https://randomuser.me/api/portraits/men/74.jpg',
    },
    createdAt: '2025-10-17T22:10:00.000Z',
    updatedAt: '2025-10-17T22:10:00.000Z',
  },
  {
    _id: '4',
    title: 'Revenue Report Generated',
    description: 'Generated weekly revenue report for dashboard analytics.',
    category: 'Report',
    action: AdministratorActivityAction.CREATE,
    administratorId: 'admin_004',
    administrator: {
      _id: 'admin_004',
      fullName: 'Jannat Akter',
      email: 'jannat@admin.com',
      level: AdministratorLevel.MODERATOR,
      profilePicture: 'https://randomuser.me/api/portraits/women/45.jpg',
    },
    createdAt: '2025-10-17T20:05:00.000Z',
    updatedAt: '2025-10-17T20:05:00.000Z',
  },
  {
    _id: '5',
    title: 'Customer Issue Resolved',
    description: 'Marked a refund issue as resolved for order #ORD10239.',
    category: 'Customer Support',
    action: AdministratorActivityAction.UPDATE,
    administratorId: 'admin_002',
    administrator: {
      _id: 'admin_002',
      fullName: 'Ayesha Rahman',
      email: 'ayesha@admin.com',
      level: AdministratorLevel.ADMIN,
      profilePicture: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    createdAt: '2025-10-17T17:30:00.000Z',
    updatedAt: '2025-10-17T17:30:00.000Z',
  },
  {
    _id: '6',
    title: 'Manual Payment Method Created',
    description: 'Added new Bkash manual payment option for users.',
    category: 'Payment Management',
    action: AdministratorActivityAction.CREATE,
    administratorId: 'admin_005',
    administrator: {
      _id: 'admin_005',
      name: 'Mahfuz Rahman',
      email: 'mahfuz@admin.com',
      level: AdministratorLevel.ADMIN,
      profilePicture: 'https://randomuser.me/api/portraits/men/20.jpg',
    },
    createdAt: '2025-10-17T15:18:00.000Z',
    updatedAt: '2025-10-17T15:18:00.000Z',
  },
];

function RecentAdministratorsActivity() {
  return (
    <Stack className="glass p-3 md:p-5 h-full min-h-[400px] ">
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <DashboardSectionHeading title="Recent Administrators Activities (Demo)" />
        <Badge color="secondary" badgeContent={10} variant="standard">
          <TbRecharging className="text-txt-primary" size={28} />
        </Badge>
      </Stack>

      <Stack marginTop={2} spacing={2}>
        {activities.map((_, index) => (
          <Fragment key={index}>
            {index !== 0 ? <Divider /> : null}
            <RecentAdministratorActivityCard activity={_} />
          </Fragment>
        ))}
      </Stack>
    </Stack>
  );
}

export default RecentAdministratorsActivity;

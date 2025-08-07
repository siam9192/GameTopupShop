'use client';
import React from 'react';
import { Pagination, Tooltip, Typography } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from '@mui/material';
import { LiaUserEditSolid } from 'react-icons/lia';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';

const rows = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    orders: 12,
    email: 'johndoe@example.com',
    phone: '+1 555-1234',
    favouriteGame: 'Call of Duty',
    joinDate: '2023-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    orders: 8,
    email: 'janesmith@example.com',
    phone: '+1 555-5678',
    favouriteGame: 'Minecraft',
    joinDate: '2022-11-30',
  },
  {
    id: 3,
    name: 'David Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    orders: 22,
    email: 'davidj@example.com',
    phone: '+1 555-9876',
    favouriteGame: 'Valorant',
    joinDate: '2023-03-10',
  },
  {
    id: 4,
    name: 'Emily Davis',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    orders: 5,
    email: 'emilyd@example.com',
    phone: '+1 555-1111',
    favouriteGame: 'Free Fire',
    joinDate: '2023-06-01',
  },
  {
    id: 5,
    name: 'Michael Brown',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    orders: 17,
    email: 'michaelb@example.com',
    phone: '+1 555-2222',
    favouriteGame: 'Fortnite',
    joinDate: '2022-09-18',
  },
  {
    id: 6,
    name: 'Olivia Wilson',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    orders: 9,
    email: 'oliviaw@example.com',
    phone: '+1 555-3333',
    favouriteGame: 'PUBG',
    joinDate: '2023-02-27',
  },
  {
    id: 7,
    name: 'William Martinez',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    orders: 13,
    email: 'williamm@example.com',
    phone: '+1 555-4444',
    favouriteGame: 'Apex Legends',
    joinDate: '2022-12-20',
  },
  {
    id: 8,
    name: 'Sophia Anderson',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    orders: 7,
    email: 'sophiaa@example.com',
    phone: '+1 555-5555',
    favouriteGame: 'Genshin Impact',
    joinDate: '2023-04-05',
  },
  {
    id: 9,
    name: 'James Thomas',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
    orders: 10,
    email: 'jamest@example.com',
    phone: '+1 555-6666',
    favouriteGame: 'League of Legends',
    joinDate: '2023-01-25',
  },
  {
    id: 10,
    name: 'Ava Taylor',
    avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
    orders: 14,
    email: 'avat@example.com',
    phone: '+1 555-7777',
    favouriteGame: 'Roblox',
    joinDate: '2022-08-15',
  },
  {
    id: 11,
    name: 'Alexander Moore',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    orders: 6,
    email: 'alexmoore@example.com',
    phone: '+1 555-8888',
    favouriteGame: 'Dota 2',
    joinDate: '2023-05-10',
  },
  {
    id: 12,
    name: 'Mia Jackson',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    orders: 11,
    email: 'miaj@example.com',
    phone: '+1 555-9999',
    favouriteGame: 'Among Us',
    joinDate: '2023-07-20',
  },
  {
    id: 13,
    name: 'Benjamin White',
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
    orders: 18,
    email: 'benwhite@example.com',
    phone: '+1 555-0001',
    favouriteGame: 'Clash Royale',
    joinDate: '2023-02-15',
  },
  {
    id: 14,
    name: 'Charlotte Harris',
    avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
    orders: 4,
    email: 'charlotteh@example.com',
    phone: '+1 555-0002',
    favouriteGame: 'Pokemon GO',
    joinDate: '2022-10-10',
  },
  {
    id: 15,
    name: 'Daniel Martin',
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
    orders: 20,
    email: 'danielm@example.com',
    phone: '+1 555-0003',
    favouriteGame: 'BGMI',
    joinDate: '2023-03-22',
  },
  {
    id: 16,
    name: 'Amelia Thompson',
    avatar: 'https://randomuser.me/api/portraits/women/16.jpg',
    orders: 16,
    email: 'ameliat@example.com',
    phone: '+1 555-0004',
    favouriteGame: 'Stumble Guys',
    joinDate: '2023-01-01',
  },
  {
    id: 17,
    name: 'Logan Garcia',
    avatar: 'https://randomuser.me/api/portraits/men/17.jpg',
    orders: 19,
    email: 'logang@example.com',
    phone: '+1 555-0005',
    favouriteGame: 'Subway Surfers',
    joinDate: '2022-07-25',
  },
  {
    id: 18,
    name: 'Harper Martinez',
    avatar: 'https://randomuser.me/api/portraits/women/18.jpg',
    orders: 15,
    email: 'harperm@example.com',
    phone: '+1 555-0006',
    favouriteGame: 'Temple Run',
    joinDate: '2023-06-30',
  },
  {
    id: 19,
    name: 'Ethan Clark',
    avatar: 'https://randomuser.me/api/portraits/men/19.jpg',
    orders: 3,
    email: 'ethanc@example.com',
    phone: '+1 555-0007',
    favouriteGame: 'Clash of Clans',
    joinDate: '2023-04-15',
  },
  {
    id: 20,
    name: 'Evelyn Lewis',
    avatar: 'https://randomuser.me/api/portraits/women/20.jpg',
    orders: 21,
    email: 'evelynl@example.com',
    phone: '+1 555-0008',
    favouriteGame: 'Zelda',
    joinDate: '2022-06-10',
  },
];

const heads = [
  {
    name: 'ID',
    sortAble: true,
  },
  {
    name: 'Name',
    sortAble: true,
  },
  {
    name: 'Orders',
    sortAble: true,
  },
  {
    name: 'Email',
    sortAble: true,
  },
  {
    name: 'Phone',
    sortAble: true,
  },
  {
    name: 'Favourites Game',
    sortAble: true,
  },
  {
    name: 'Join Date',
    sortAble: true,
  },
  {
    name: 'Actions',
    sortAble: false,
  },
];

function CustomersTable() {
  return (
    <div className="mt-10 p-3 lg:p-5 glass">
      <Typography
        component="h1"
        variant="h5"
        fontFamily="jost"
        fontWeight={600}
        color="text.primary"
        mb={2}
      >
        Customers
      </Typography>

      <TableContainer  sx={{
        overflowX:'scroll'
      }}>
        <Table>
          <TableHead>
            <TableRow>
              {heads.map(head => (
                <TableCell key={head.name}>{head.name.toUpperCase()}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>#{row.id}</TableCell>
                <TableCell>
                  <Avatar alt={row.name} src={row.avatar} />
                </TableCell>
                <TableCell>{row.orders}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.favouriteGame}</TableCell>
                <TableCell>{new Date().toDateString()}</TableCell>

                <TableCell>
                  <Tooltip title="View Full Details">
                    <button className="text-2xl hover:text-primary mr-2 hover:cursor-pointer">
                      <HiOutlineViewfinderCircle />
                    </button>
                  </Tooltip>

                  <Tooltip title="Edit Customer">
                    <button className="text-2xl hover:text-secondary mr-2 hover:cursor-pointer">
                      <LiaUserEditSolid />
                    </button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          style={{ marginTop: '15px' }}
          count={10}
          size="large"
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </TableContainer>
    </div>
  );
}

export default CustomersTable;

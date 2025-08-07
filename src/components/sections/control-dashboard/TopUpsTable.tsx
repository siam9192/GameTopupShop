'use client';
import React from 'react';
import { Pagination, Stack, Tooltip, Typography } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,

} from '@mui/material';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import { MdOutlineEdit } from 'react-icons/md';
const rows: TRows[] = [
  {
    id: 1,
    image: 'https://via.placeholder.com/60x60?text=G1',
    name: 'Free Fire Diamonds',
    packages: 5,
    orders: 120,
    revenue: 54000,
    status: 'active',
    createdAt: '2023-01-15',
    updatedAt: '2023-06-20'
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/60x60?text=G2',
    name: 'PUBG UC',
    packages: 4,
    orders: 95,
    revenue: 45000,
    status: 'active',
    createdAt: '2023-02-10',
    updatedAt: '2023-06-25'
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/60x60?text=G3',
    name: 'Mobile Legends Diamonds',
    packages: 6,
    orders: 110,
    revenue: 50500,
    status: 'active',
    createdAt: '2023-01-28',
    updatedAt: '2023-05-30'
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/60x60?text=G4',
    name: 'Roblox Robux',
    packages: 3,
    orders: 85,
    revenue: 30000,
    status: 'inactive',
    createdAt: '2023-03-12',
    updatedAt: '2023-07-01'
  },
  {
    id: 5,
    image: 'https://via.placeholder.com/60x60?text=G5',
    name: 'Valorant Points',
    packages: 4,
    orders: 100,
    revenue: 48000,
    status: 'active',
    createdAt: '2023-04-05',
    updatedAt: '2023-06-10'
  },
  {
    id: 6,
    image: 'https://via.placeholder.com/60x60?text=G6',
    name: 'COD CP (Call of Duty)',
    packages: 2,
    orders: 60,
    revenue: 27000,
    status: 'draft',
    createdAt: '2023-02-20',
    updatedAt: '2023-06-15'
  },
  {
    id: 7,
    image: 'https://via.placeholder.com/60x60?text=G7',
    name: 'Genshin Impact Crystals',
    packages: 3,
    orders: 45,
    revenue: 20000,
    status: 'inactive',
    createdAt: '2023-05-02',
    updatedAt: '2023-07-10'
  },
  {
    id: 8,
    image: 'https://via.placeholder.com/60x60?text=G8',
    name: 'Fortnite V-Bucks',
    packages: 5,
    orders: 70,
    revenue: 33000,
    status: 'active',
    createdAt: '2023-01-10',
    updatedAt: '2023-07-01'
  },
  {
    id: 9,
    image: 'https://via.placeholder.com/60x60?text=G9',
    name: 'League of Legends RP',
    packages: 6,
    orders: 98,
    revenue: 47000,
    status: 'inactive',
    createdAt: '2023-03-25',
    updatedAt: '2023-06-05'
  },
  {
    id: 10,
    image: 'https://via.placeholder.com/60x60?text=G10',
    name: 'Apex Legends Coins',
    packages: 4,
    orders: 63,
    revenue: 31500,
    status: 'active',
    createdAt: '2023-04-18',
    updatedAt: '2023-07-05'
  },
  {
    id: 11,
    image: 'https://via.placeholder.com/60x60?text=G11',
    name: 'Clash of Clans Gems',
    packages: 5,
    orders: 77,
    revenue: 37000,
    status: 'active',
    createdAt: '2023-02-08',
    updatedAt: '2023-06-30'
  },
  {
    id: 12,
    image: 'https://via.placeholder.com/60x60?text=G12',
    name: 'Stumble Guys Gems',
    packages: 3,
    orders: 52,
    revenue: 21000,
    status: 'draft',
    createdAt: '2023-03-14',
    updatedAt: '2023-06-18'
  },
  {
    id: 13,
    image: 'https://via.placeholder.com/60x60?text=G13',
    name: 'BGMI UC',
    packages: 4,
    orders: 90,
    revenue: 46000,
    status: 'active',
    createdAt: '2023-01-05',
    updatedAt: '2023-07-03'
  },
  {
    id: 14,
    image: 'https://via.placeholder.com/60x60?text=G14',
    name: 'Clash Royale Gems',
    packages: 2,
    orders: 38,
    revenue: 18000,
    status: 'inactive',
    createdAt: '2023-05-20',
    updatedAt: '2023-07-15'
  },
  {
    id: 15,
    image: 'https://via.placeholder.com/60x60?text=G15',
    name: 'Temple Run Coins',
    packages: 1,
    orders: 25,
    revenue: 9500,
    status: 'draft',
    createdAt: '2023-06-01',
    updatedAt: '2023-07-10'
  },
  {
    id: 16,
    image: 'https://via.placeholder.com/60x60?text=G16',
    name: 'Subway Surfers Keys',
    packages: 2,
    orders: 42,
    revenue: 15000,
    status: 'inactive',
    createdAt: '2023-02-14',
    updatedAt: '2023-06-22'
  },
  {
    id: 17,
    image: 'https://via.placeholder.com/60x60?text=G17',
    name: 'Lords Mobile Packs',
    packages: 4,
    orders: 66,
    revenue: 31000,
    status: 'active',
    createdAt: '2023-03-08',
    updatedAt: '2023-06-25'
  },
  {
    id: 18,
    image: 'https://via.placeholder.com/60x60?text=G18',
    name: 'Brawl Stars Gems',
    packages: 3,
    orders: 47,
    revenue: 20000,
    status: 'active',
    createdAt: '2023-04-10',
    updatedAt: '2023-07-08'
  },
  {
    id: 19,
    image: 'https://via.placeholder.com/60x60?text=G19',
    name: 'Zelda Points',
    packages: 2,
    orders: 29,
    revenue: 12500,
    status: 'inactive',
    createdAt: '2023-05-01',
    updatedAt: '2023-07-12'
  },
  {
    id: 20,
    image: 'https://via.placeholder.com/60x60?text=G20',
    name: 'Steam Wallet Codes',
    packages: 5,
    orders: 150,
    revenue: 75000,
    status: 'active',
    createdAt: '2023-01-01',
    updatedAt: '2023-07-20'
  }
];
type TRows = {
  id: number;
  image: string;
  name: string;
  packages: number;
  orders: number;
  revenue: number;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
};


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
    name: 'Packages',
    sortAble: true,
  },
  {
    name: 'Orders',
    sortAble: true,
  },
  {
    name: 'Revenue',
    sortAble: true,
  },
  {
    name: 'Status',
    sortAble: true,
  },
 
  {
    name: 'Created At',
    sortAble: true,
  },

   {
    name: 'Last Updated At',
    sortAble: true,
  },
  {
    name: 'Actions',
    sortAble: true,
  },
];

function TopUpsTable() {
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
        Top ups
      </Typography>

      <TableContainer>
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
                 <Stack direction={'row'} alignItems={'center'} gap={1}>
                   <img src="https://play-lh.googleusercontent.com/Odw8BGugaJLdbaSbCeZWbTE3Qz1wTiQ0Tsn9nzpoQdnkzWb-gaI58zzTmYDvGpdYKg" alt={'image'}  className='size-16 rounded-lg'/>
                   <Typography >{row.name}</Typography>
                 </Stack>
                </TableCell>
                                <TableCell>{row.packages}</TableCell>

                <TableCell>{row.orders}</TableCell>
                <TableCell>{row.revenue}</TableCell>
                <TableCell>{row.status.toUpperCase()}</TableCell>
                   <TableCell>{new Date().toDateString()}</TableCell>
                <TableCell>{new Date().toDateString()}</TableCell>

                <TableCell>
                  <Tooltip title="View Full Details">
                    <button className="text-2xl hover:text-primary mr-2 hover:cursor-pointer">
                      <HiOutlineViewfinderCircle />
                    </button>
                  </Tooltip>
                    <Tooltip title="Make changes">
                    <button className="text-2xl hover:text-primary mr-2 hover:cursor-pointer">
                   <MdOutlineEdit />
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

export default TopUpsTable;

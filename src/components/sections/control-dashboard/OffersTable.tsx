'use client';
import React, { useState } from 'react';
import { Pagination, Stack, Tooltip, Typography } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import { MdOutlineEdit } from 'react-icons/md';
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';
const rows: TRows[] = [
  {
    id: 1,
    image: 'https://via.placeholder.com/60x60?text=G1',
    name: 'Free Fire Diamonds',
    price: 5,
    orders: 120,
    revenue: 54000,
    status: 'active',
    endAt: '2023-01-15',
    createdAt: '2023-01-15',
    updatedAt: '2023-06-20',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/60x60?text=G2',
    name: 'PUBG UC',
    price: 4,
    orders: 95,
    revenue: 45000,
    status: 'active',
    endAt: '2023-01-15',
    createdAt: '2023-02-10',
    updatedAt: '2023-06-25',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/60x60?text=G3',
    name: 'Mobile Legends Diamonds',
    price: 6,
    orders: 110,
    revenue: 50500,
    status: 'active',
    endAt: '2023-01-15',
    createdAt: '2023-01-28',
    updatedAt: '2023-05-30',
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/60x60?text=G4',
    name: 'Roblox Robux',
    price: 3,
    orders: 85,
    revenue: 30000,
    status: 'inactive',
    endAt: '2023-01-15',
    createdAt: '2023-03-12',
    updatedAt: '2023-07-01',
  },
  {
    id: 5,
    image: 'https://via.placeholder.com/60x60?text=G5',
    name: 'Valorant Points',
    price: 4,
    orders: 100,
    revenue: 48000,
    status: 'active',
    endAt: '2023-01-15',
    createdAt: '2023-04-05',
    updatedAt: '2023-06-10',
  },
  {
    id: 6,
    image: 'https://via.placeholder.com/60x60?text=G6',
    name: 'COD CP (Call of Duty)',
    price: 2,
    orders: 60,
    revenue: 27000,
    status: 'draft',
    endAt: '2023-01-15',
    createdAt: '2023-02-20',
    updatedAt: '2023-06-15',
  },
  {
    id: 7,
    image: 'https://via.placeholder.com/60x60?text=G7',
    name: 'Genshin Impact Crystals',
    price: 3,
    orders: 45,
    revenue: 20000,
    status: 'inactive',
    endAt: '2023-01-15',
    createdAt: '2023-05-02',
    updatedAt: '2023-07-10',
  },
  {
    id: 8,
    image: 'https://via.placeholder.com/60x60?text=G8',
    name: 'Fortnite V-Bucks',
    price: 5,
    orders: 70,
    revenue: 33000,
    status: 'active',
    endAt: '2023-01-15',
    createdAt: '2023-01-10',
    updatedAt: '2023-07-01',
  },
  {
    id: 9,
    image: 'https://via.placeholder.com/60x60?text=G9',
    name: 'League of Legends RP',
    price: 6,
    orders: 98,
    revenue: 47000,
    status: 'inactive',
    endAt: '2023-01-15',
    createdAt: '2023-03-25',
    updatedAt: '2023-06-05',
  },
  {
    id: 10,
    image: 'https://via.placeholder.com/60x60?text=G10',
    name: 'Apex Legends Coins',
    price: 4,
    orders: 63,
    revenue: 31500,
    status: 'active',
    endAt: '2023-01-15',
    createdAt: '2023-04-18',
    updatedAt: '2023-07-05',
  },
  {
    id: 11,
    image: 'https://via.placeholder.com/60x60?text=G11',
    name: 'Clash of Clans Gems',
    price: 5,
    orders: 77,
    revenue: 37000,
    status: 'active',
    endAt: '2023-01-15',
    createdAt: '2023-02-08',
    updatedAt: '2023-06-30',
  },
  {
    id: 12,
    image: 'https://via.placeholder.com/60x60?text=G12',
    name: 'Stumble Guys Gems',
    price: 3,
    orders: 52,
    revenue: 21000,
    status: 'draft',
    endAt: '2023-01-15',
    createdAt: '2023-03-14',
    updatedAt: '2023-06-18',
  },
  {
    id: 13,
    image: 'https://via.placeholder.com/60x60?text=G13',
    name: 'BGMI UC',
    price: 4,
    orders: 90,
    revenue: 46000,
    status: 'active',
    endAt: '2023-01-15',
    createdAt: '2023-01-05',
    updatedAt: '2023-07-03',
  },
  {
    id: 14,
    image: 'https://via.placeholder.com/60x60?text=G14',
    name: 'Clash Royale Gems',
    price: 2,
    orders: 38,
    revenue: 18000,
    status: 'inactive',
    endAt: '2023-01-15',
    createdAt: '2023-05-20',
    updatedAt: '2023-07-15',
  },
  {
    id: 15,
    image: 'https://via.placeholder.com/60x60?text=G15',
    name: 'Temple Run Coins',
    price: 1,
    orders: 25,
    revenue: 9500,
    status: 'draft',
    endAt: '2023-01-15',
    createdAt: '2023-06-01',
    updatedAt: '2023-07-10',
  },
  {
    id: 16,
    image: 'https://via.placeholder.com/60x60?text=G16',
    name: 'Subway Surfers Keys',
    price: 2,
    orders: 42,
    revenue: 15000,
    status: 'inactive',
    endAt: '2023-01-15',
    createdAt: '2023-02-14',
    updatedAt: '2023-06-22',
  },
  {
    id: 17,
    image: 'https://via.placeholder.com/60x60?text=G17',
    name: 'Lords Mobile Packs',
    price: 4,
    orders: 66,
    revenue: 31000,
    status: 'active',
    endAt: '2023-01-15',
    createdAt: '2023-03-08',
    updatedAt: '2023-06-25',
  },
  {
    id: 18,
    image: 'https://via.placeholder.com/60x60?text=G18',
    name: 'Brawl Stars Gems',
    price: 3,
    orders: 47,
    revenue: 20000,
    status: 'active',
    endAt: '2023-01-15',
    createdAt: '2023-04-10',
    updatedAt: '2023-07-08',
  },
  {
    id: 19,
    image: 'https://via.placeholder.com/60x60?text=G19',
    name: 'Zelda Points',
    price: 2,
    orders: 29,
    revenue: 12500,
    status: 'inactive',
    endAt: '2023-01-15',
    createdAt: '2023-05-01',
    updatedAt: '2023-07-12',
  },
  {
    id: 20,
    image: 'https://via.placeholder.com/60x60?text=G20',
    name: 'Steam Wallet Codes',
    price: 5,
    orders: 150,
    revenue: 75000,
    status: 'active',
    endAt: '2023-01-15',
    createdAt: '2023-01-01',
    updatedAt: '2023-07-20',
  },
];
type TRows = {
  id: number;
  image: string;
  name: string;
  price: number;
  orders: number;
  revenue: number;
  status: 'active' | 'inactive' | 'draft';
  endAt: string;
  createdAt: string;
  updatedAt: string;
};

const heads = [
  {
    name: 'ID',
    sortable: false,
  },
  {
    name: 'Name',
    sortable: true,
  },
  {
    name: 'price',
    sortable: true,
  },
  {
    name: 'Orders',
    sortable: true,
  },
  {
    name: 'Revenue',
    sortable: true,
  },
  {
    name: 'Status',
    sortable: false,
  },
  {
    name: 'End At',
    sortable: true,
  },

  {
    name: 'Created At',
    sortable: true,
  },

  {
    name: 'Last Updated At',
    sortable: true,
  },
  {
    name: 'Actions',
    sortable: false,
  },
];

function OffersTable() {
  const [sort, setSort] = useState<{ name: string; by: 'asc' | 'desc' } | null>(null);
  return (
    <div className="mt-10 p-2 lg:p-5 glass overflow-x-auto dark:bg-paper">
      <Typography
        component="h1"
        variant="h5"
        fontFamily="jost"
        fontWeight={600}
        color="text.primary"
        mb={1}
      >
        Offers Table
      </Typography>

      <div className=" overflow-x-auto">
        <TableContainer sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
          <Table>
            <TableHead>
              <TableRow>
                {heads.map(head => (
                  <TableCell key={head.name}>
                    {head.sortable ? (
                      <Stack direction={'row'} gap={0.5}>
                        <span>{head.name.toUpperCase()}</span>
                        <button
                          onClick={() => setSort(p => ({ name: head.name, by: p?.by || 'asc' }))}
                          className={` text-xl ${sort?.name === head.name ? 'text-primary' : 'text-txt-primary'}`}
                        >
                          {sort?.name === head.name && sort?.by === 'asc' ? (
                            <IoMdArrowUp />
                          ) : (
                            <IoMdArrowDown />
                          )}
                        </button>
                      </Stack>
                    ) : (
                      head.name.toUpperCase()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell>#{row.id}</TableCell>
                  <TableCell style={{ minWidth: '300px' }}>
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                      <img
                        src="https://cdn-www.bluestacks.com/bs-images/FreeFire_Guide_DiamondsGuide_EN2.jpg"
                        alt={'image'}
                        className=" size-14 md:size-16 rounded-lg object-cover"
                      />
                      <Typography>{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.price}</TableCell>

                  <TableCell>{row.orders}</TableCell>
                  <TableCell>{row.revenue}</TableCell>
                  <TableCell>{row.status.toUpperCase()}</TableCell>
                  <TableCell>{new Date().toDateString()}</TableCell>
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
        </TableContainer>
      </div>
      <Pagination
        style={{ marginTop: '15px' }}
        count={10}
        size="large"
        color="primary"
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
}

export default OffersTable;

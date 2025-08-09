'use client';
import React, { useState } from 'react';
import { Pagination, Stack, Tooltip, Typography } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import { MdOutlineEdit } from 'react-icons/md';
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';
type TRows = {
  id: number;
  image: string;
  product: string;
  category: string;
  quantity: number;
  total: number;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  customer: string;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
};

const rows: TRows[] = [
  {
    id: 1,
    image: 'https://via.placeholder.com/60x60?text=G1',
    product: 'Free Fire Diamonds',
    category: 'Gaming',
    quantity: 120,
    total: 54000,
    paymentStatus: 'Paid',
    customer: 'John Doe',
    status: 'active',
    createdAt: '2023-01-15',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/60x60?text=G2',
    product: 'PUBG UC',
    category: 'Gaming',
    quantity: 95,
    total: 45000,
    paymentStatus: 'Pending',
    customer: 'Jane Smith',
    status: 'active',
    createdAt: '2023-02-10',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/60x60?text=G3',
    product: 'Mobile Legends Diamonds',
    category: 'Gaming',
    quantity: 110,
    total: 50500,
    paymentStatus: 'Paid',
    customer: 'Alex Johnson',
    status: 'active',
    createdAt: '2023-01-28',
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/60x60?text=G4',
    product: 'Roblox Robux',
    category: 'Gaming',
    quantity: 85,
    total: 30000,
    paymentStatus: 'Failed',
    customer: 'Chris Evans',
    status: 'inactive',
    createdAt: '2023-03-12',
  },
  {
    id: 5,
    image: 'https://via.placeholder.com/60x60?text=G5',
    product: 'Valorant Points',
    category: 'Gaming',
    quantity: 100,
    total: 48000,
    paymentStatus: 'Paid',
    customer: 'Emma Watson',
    status: 'active',
    createdAt: '2023-04-05',
  },
  {
    id: 6,
    image: 'https://via.placeholder.com/60x60?text=G6',
    product: 'COD CP (Call of Duty)',
    category: 'Gaming',
    quantity: 60,
    total: 27000,
    paymentStatus: 'Pending',
    customer: 'Robert Downey',
    status: 'draft',
    createdAt: '2023-02-20',
  },
  {
    id: 7,
    image: 'https://via.placeholder.com/60x60?text=G7',
    product: 'Genshin Impact Crystals',
    category: 'Gaming',
    quantity: 45,
    total: 20000,
    paymentStatus: 'Failed',
    customer: 'Scarlett King',
    status: 'inactive',
    createdAt: '2023-05-02',
  },
  {
    id: 8,
    image: 'https://via.placeholder.com/60x60?text=G8',
    product: 'Fortnite V-Bucks',
    category: 'Gaming',
    quantity: 70,
    total: 33000,
    paymentStatus: 'Paid',
    customer: 'Tom Holland',
    status: 'active',
    createdAt: '2023-01-10',
  },
  {
    id: 9,
    image: 'https://via.placeholder.com/60x60?text=G9',
    product: 'League of Legends RP',
    category: 'Gaming',
    quantity: 98,
    total: 47000,
    paymentStatus: 'Pending',
    customer: 'Zendaya Maree',
    status: 'inactive',
    createdAt: '2023-03-25',
  },
  {
    id: 10,
    image: 'https://via.placeholder.com/60x60?text=G10',
    product: 'Apex Legends Coins',
    category: 'Gaming',
    quantity: 63,
    total: 31500,
    paymentStatus: 'Paid',
    customer: 'Chris Pratt',
    status: 'active',
    createdAt: '2023-04-18',
  },
  {
    id: 11,
    image: 'https://via.placeholder.com/60x60?text=G11',
    product: 'Clash of Clans Gems',
    category: 'Gaming',
    quantity: 77,
    total: 37000,
    paymentStatus: 'Failed',
    customer: 'Mark Ruffalo',
    status: 'active',
    createdAt: '2023-02-08',
  },
  {
    id: 12,
    image: 'https://via.placeholder.com/60x60?text=G12',
    product: 'Stumble Guys Gems',
    category: 'Gaming',
    quantity: 52,
    total: 21000,
    paymentStatus: 'Paid',
    customer: 'Natalie Port',
    status: 'draft',
    createdAt: '2023-03-14',
  },
  {
    id: 13,
    image: 'https://via.placeholder.com/60x60?text=G13',
    product: 'BGMI UC',
    category: 'Gaming',
    quantity: 90,
    total: 46000,
    paymentStatus: 'Pending',
    customer: 'Ethan Hunt',
    status: 'active',
    createdAt: '2023-01-05',
  },
  {
    id: 14,
    image: 'https://via.placeholder.com/60x60?text=G14',
    product: 'Clash Royale Gems',
    category: 'Gaming',
    quantity: 38,
    total: 18000,
    paymentStatus: 'Paid',
    customer: 'Emma Stone',
    status: 'inactive',
    createdAt: '2023-05-20',
  },
  {
    id: 15,
    image: 'https://via.placeholder.com/60x60?text=G15',
    product: 'Temple Run Coins',
    category: 'Gaming',
    quantity: 25,
    total: 9500,
    paymentStatus: 'Failed',
    customer: 'Ryan Gosling',
    status: 'draft',
    createdAt: '2023-06-01',
  },
  {
    id: 16,
    image: 'https://via.placeholder.com/60x60?text=G16',
    product: 'Subway Surfers Keys',
    category: 'Gaming',
    quantity: 42,
    total: 15000,
    paymentStatus: 'Pending',
    customer: 'Gal Gadot',
    status: 'inactive',
    createdAt: '2023-02-14',
  },
  {
    id: 17,
    image: 'https://via.placeholder.com/60x60?text=G17',
    product: 'Lords Mobile Packs',
    category: 'Gaming',
    quantity: 66,
    total: 31000,
    paymentStatus: 'Paid',
    customer: 'Chris Hemsworth',
    status: 'active',
    createdAt: '2023-03-08',
  },
  {
    id: 18,
    image: 'https://via.placeholder.com/60x60?text=G18',
    product: 'Brawl Stars Gems',
    category: 'Gaming',
    quantity: 47,
    total: 20000,
    paymentStatus: 'Failed',
    customer: 'Henry Cavill',
    status: 'active',
    createdAt: '2023-04-10',
  },
  {
    id: 19,
    image: 'https://via.placeholder.com/60x60?text=G19',
    product: 'Zelda Points',
    category: 'Gaming',
    quantity: 29,
    total: 12500,
    paymentStatus: 'Paid',
    customer: 'Brie Larson',
    status: 'inactive',
    createdAt: '2023-05-01',
  },
  {
    id: 20,
    image: 'https://via.placeholder.com/60x60?text=G20',
    product: 'Steam Wallet Codes',
    category: 'Gaming',
    quantity: 150,
    total: 75000,
    paymentStatus: 'Pending',
    customer: 'Keanu Reeves',
    status: 'active',
    createdAt: '2023-01-01',
  },
];

const heads = [
  {
    name: 'ID',
    sortable: false,
  },
  {
    name: 'Product',
    sortable: true,
  },
  {
    name: 'Category',
    sortable: true,
  },
  {
    name: 'Quantity',
    sortable: true,
  },
  {
    name: 'Total',
    sortable: true,
  },
  {
    name: 'Payment Status',
    sortable: true,
  },
  {
    name: 'Customer',
    sortable: true,
  },
  {
    name: 'Status',
    sortable: false,
  },

  {
    name: 'Created At',
    sortable: true,
  },

  {
    name: 'Actions',
    sortable: false,
  },
];

function OrdersTable() {
  const [sort, setSort] = useState<{ name: string; by: 'asc' | 'desc' } | null>(null);
  return (
    <div className="mt-10 p-2 lg:p-5 glass overflow-x-auto ">
      <Typography
        component="h1"
        variant="h5"
        fontFamily="jost"
        fontWeight={600}
        color="text.primary"
        mb={1}
      >
        Orders Table
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
                      <Typography>{row.product}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.category}</TableCell>

                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>{row.paymentStatus}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.status}</TableCell>

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

export default OrdersTable;

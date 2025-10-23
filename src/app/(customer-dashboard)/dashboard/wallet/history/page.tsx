'use client';
import WalletHistoryCard from '@/components/cards/WalletHistoryCard';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { getWalletsHistoriesQuery } from '@/query/services/wallet-history';
import { WalletHistoryType } from '@/types/wallet-history.type';
import {
  Box,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const sortOptions = [
  { label: 'Date (Newest → Oldest)', value: 'createdAt-desc' },
  { label: 'Date (Oldest → Newest)', value: 'createdAt-asc' },
];

function page() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(sortOptions[0].value);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSort(event.target.value as string);
  };

  const { data, isLoading } = getWalletsHistoriesQuery([
    { name: 'page', value: String(page) },
    { name: 'sortBy', value: sort.split('-')[0] },
    { name: 'sortOrder', value: sort.split('-')[1] },
  ]);

  const histories = [
    {
      _id: 'wh1',
      walletId: 'w12345',
      prevBalance: 100.0,
      amount: 25.0,
      type: WalletHistoryType.CREDIT,
      createdAt: new Date('2025-10-10T09:20:00Z'),
      updatedAt: new Date('2025-10-10T09:20:00Z'),
    },
    {
      _id: 'wh2',
      walletId: 'w12345',
      prevBalance: 125.0,
      amount: 40.0,
      type: WalletHistoryType.DEBIT,
      createdAt: new Date('2025-10-11T13:45:00Z'),
      updatedAt: new Date('2025-10-11T13:45:00Z'),
    },
    {
      _id: 'wh3',
      walletId: 'w12345',
      prevBalance: 85.0,
      amount: 60.0,
      type: WalletHistoryType.CREDIT,
      createdAt: new Date('2025-10-12T08:10:00Z'),
      updatedAt: new Date('2025-10-12T08:10:00Z'),
    },
    {
      _id: 'wh4',
      walletId: 'w12345',
      prevBalance: 145.0,
      amount: 15.0,
      type: WalletHistoryType.DEBIT,
      createdAt: new Date('2025-10-13T16:25:00Z'),
      updatedAt: new Date('2025-10-13T16:25:00Z'),
    },
    {
      _id: 'wh5',
      walletId: 'w12345',
      prevBalance: 130.0,
      amount: 100.0,
      type: WalletHistoryType.CREDIT,
      createdAt: new Date('2025-10-14T11:50:00Z'),
      updatedAt: new Date('2025-10-14T11:50:00Z'),
    },
    {
      _id: 'wh6',
      walletId: 'w12345',
      prevBalance: 230.0,
      amount: 35.0,
      type: WalletHistoryType.DEBIT,
      createdAt: new Date('2025-10-15T18:05:00Z'),
      updatedAt: new Date('2025-10-15T18:05:00Z'),
    },
    {
      _id: 'wh7',
      walletId: 'w12345',
      prevBalance: 195.0,
      amount: 75.0,
      type: WalletHistoryType.CREDIT,
      createdAt: new Date('2025-10-16T07:40:00Z'),
      updatedAt: new Date('2025-10-16T07:40:00Z'),
    },
    {
      _id: 'wh8',
      walletId: 'w12345',
      prevBalance: 270.0,
      amount: 20.0,
      type: WalletHistoryType.DEBIT,
      createdAt: new Date('2025-10-17T10:15:00Z'),
      updatedAt: new Date('2025-10-17T10:15:00Z'),
    },
    {
      _id: 'wh9',
      walletId: 'w12345',
      prevBalance: 250.0,
      amount: 50.0,
      type: WalletHistoryType.CREDIT,
      createdAt: new Date('2025-10-18T14:55:00Z'),
      updatedAt: new Date('2025-10-18T14:55:00Z'),
    },
    {
      _id: 'wh10',
      walletId: 'w12345',
      prevBalance: 300.0,
      amount: 45.0,
      type: WalletHistoryType.DEBIT,
      createdAt: new Date('2025-10-19T21:10:00Z'),
      updatedAt: new Date('2025-10-19T21:10:00Z'),
    },
  ];
  const meta = data?.meta;
  const totalPages = meta ? Math.ceil(meta.totalResults / meta.limit) : 0;

  return (
    <Box>
      <DashboardPageHeading title="Wallet History" />
      {/* Sort Dropdown */}

      {/* Loading State */}
      {isLoading ? (
        <Box className="h-[300px] flex justify-center items-center">
          <CircularProgress />
        </Box>
      ) : meta?.totalResults === 0 ? (
        <Box height={300} display="flex" justifyContent="center" alignItems="center">
          <Typography color="text.primary" align="center" fontSize={20}>
            You have no orders yet
          </Typography>
        </Box>
      ) : (
        <Box>
          {/* Sort Dropdown */}
          <Stack mt={2} direction="row" justifyContent="flex-end">
            <FormControl sx={{ minWidth: 220 }} size="medium">
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                id="sort"
                value={sort}
                label="Sort By"
                onChange={handleChange as any}
              >
                {sortOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          {/* Orders List */}
          {histories.length > 0 ? (
            <Stack mt={4} spacing={2}>
              {histories.map((history: any, index: number) => (
                <Box key={history._id || index}>
                  {index === 0 && <Divider />}
                  <WalletHistoryCard history={history} />
                  {index !== histories.length - 1 && <Divider />}
                </Box>
              ))}
            </Stack>
          ) : (
            <Box height={300} display="flex" justifyContent="center" alignItems="center">
              <Typography color="text.primary" align="center" fontSize={20}>
                No results found
              </Typography>
            </Box>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Stack direction="row" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                showFirstButton
                showLastButton
              />
            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
}

export default page;

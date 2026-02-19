'use client';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import React, { useState } from 'react';

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
import { getMyWalletSubmissionsQuery } from '@/query/services/wallet-submission';
import CustomerWalletSubmissionCard from '@/components/cards/CustomerWalletSubmissionCard';

const sortOptions = [
  { label: 'Date (Newest → Oldest)', value: 'createdAt-desc' },
  { label: 'Date (Oldest → Newest)', value: 'createdAt-asc' },
  { label: 'Amount (High → Low)', value: 'amount-desc' },
  { label: 'Amount (Low → High)', value: 'amount-asc' },
];

function page() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(sortOptions[0].value);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSort(event.target.value as string);
  };

  const { data, isLoading } = getMyWalletSubmissionsQuery([
    { name: 'page', value: String(page) },
    { name: 'sortBy', value: sort.split('-')[0] },
    { name: 'sortOrder', value: sort.split('-')[1] },
  ]);

  const submissions = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta ? Math.ceil(meta.totalResults / meta.limit) : 0;

  return (
    <Box>
      <DashboardPageHeading title="My submissions" />

      {/* Loading State */}
      {isLoading ? (
        <Box className="h-[300px] flex justify-center items-center">
          <CircularProgress />
        </Box>
      ) : meta?.totalResults === 0 ? (
        <Box height={300} display="flex" justifyContent="center" alignItems="center">
          <Typography color="text.primary" align="center" fontSize={20}>
            You have no submissions yet
          </Typography>
        </Box>
      ) : (
        <Box>
          {/* Sort Dropdown */}
          <Stack mt={2} direction="row" justifyContent="flex-end">
            <FormControl sx={{ minWidth: 220 }} size="small">
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

          {/* submissions List */}
          {submissions.length > 0 ? (
            <Stack mt={4} spacing={2}>
              {submissions.map((submission, index: number) => (
                <Box key={submission._id || index}>
                  {index === 0 && <Divider />}
                  <CustomerWalletSubmissionCard submission={submission} />
                  {index !== submissions.length - 1 && <Divider />}
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

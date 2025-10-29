'use client';
import TopupCard from '@/components/cards/TopupCard';
import { getPublicTopupsQuery } from '@/query/services/topup';
import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
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
  { label: 'Name (A → Z)', value: 'name-asc' },
  { label: 'Name (Z → A)', value: 'name-desc' },
];

function page() {
  const [sort, setSort] = useState(sortOptions[0].value);
  const { data, isLoading } = getPublicTopupsQuery([
    {
      name: 'sortBy',
      value: sort.split('-')[0],
    },
    {
      name: 'sortOrder',
      value: sort.split('-')[1],
    },
  ]);
  const topups = data?.data || [];

  const meta = data?.meta;
  const totalPages = meta ? Math.ceil(meta.totalResults / meta.limit) : 0;

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSort(event.target.value as string);
  };
  return (
    <div>
      <Typography
        fontFamily={'jost'}
        sx={{
          fontSize: {
            xs: 24,
            sm: 28,
            md: 30,
            lg: 36,
          },
        }}
        fontWeight={500}
        variant="h5"
        color="text.primary"
        component={'h1'}
      >
        Available Topups
      </Typography>

      {isLoading ? (
        <div className="h-[300px] flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <Box>
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
          <Grid
            marginTop={3}
            container
            spacing={2}
            columns={{
              xs: 2,
              md: 3,
              lg: 5,
              xl: 5,
            }}
          >
            {topups?.map((_, index) => (
              <Grid key={index} size={1}>
                <TopupCard topup={_} />
              </Grid>
            ))}
          </Grid>
          {meta?.totalResults === 0 && (
            <Typography variant="h5" color="text.primary" align="center">
              No results
            </Typography>
          )}
          {!isLoading ? (
            <Stack spacing={2} marginTop={5}>
              <Pagination count={totalPages} size="large" variant="outlined" shape="rounded" />
            </Stack>
          ) : null}
        </Box>
      )}
    </div>
  );
}

export default page;

'use client';
import WalletHistoryCard from '@/components/cards/WalletHistoryCard';
import {
  Box,
  Divider,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

function page() {
  const length = 12;
  const [sort, setSort] = React.useState('date_desc');

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setSort(value);
  };
  return (
    <Box>
      <Typography fontSize={28} fontWeight={600} color="text.primary">
        Wallet History
      </Typography>
      <Stack marginTop={2} direction={'row'} justifyContent={'end'}>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={sort}
          label="Sort"
          onChange={handleChange}
          sx={{
            minWidth: 200,
          }}
        >
          <MenuItem value="date_desc">Date (Newest → Oldest)</MenuItem>
          <MenuItem value="date_asc">Date (Oldest → Newest)</MenuItem>
          <MenuItem value="title_asc">Title (A → Z)</MenuItem>
          <MenuItem value="title_desc">Title (Z → A)</MenuItem>
        </Select>
      </Stack>
      <Stack marginTop={5} spacing={2}>
        {Array.from({ length }).map((_, index) => (
          <Box key={index}>
            {0 === index ? <Divider /> : null}
            <WalletHistoryCard />
            {length - 1 !== index ? <Divider /> : null}
          </Box>
        ))}
      </Stack>
      <Stack direction={'row'} justifyContent={'center'}>
        <Pagination
          color="primary"
          sx={{
            marginTop: 3,
          }}
          count={10}
          showFirstButton
          showLastButton
        />
      </Stack>
    </Box>
  );
}

export default page;

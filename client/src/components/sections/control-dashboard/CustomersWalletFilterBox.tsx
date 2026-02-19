'use client';

import DashboardSearchInput from '@/components/ui/DashboardSearchInput';
import { useCustomersWalletPageContext } from '@/provider/CustomersWalletPageProvider';
import { Box, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

function CustomersWalletFilterBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const { setFilters } = useCustomersWalletPageContext();
  const [minBalance, setMinBalance] = useState(0);
  const [maxBalance, setMaxBalance] = useState(0);

  const handleSearch = () => {
    const filters: Record<string, string | number> = {};
    if (searchTerm) {
      filters['searchTerm'] = searchTerm;
    }

    if (minBalance) {
      filters['minBalance'] = minBalance;
    }

    if (maxBalance) {
      filters['minBalance'] = maxBalance;
    }

    setFilters(filters);
  };

  return (
    <div className="p-5 glass  lg:block hidden">
      <Stack
        direction="row"
        gap={2}
        flexWrap="wrap"
        alignItems="flex-end" // ✅ aligns bottom edges (inputs & button)
      >
        {/* Search Section */}
        <Box flex={1} minWidth={250}>
          <Typography
            component="p"
            variant="h6"
            fontSize={20}
            fontFamily="jost"
            fontWeight={600}
            color="text.primary"
            mb={1}
          >
            What are you looking for
          </Typography>
          <DashboardSearchInput
            onChange={v => setSearchTerm(v)}
            placeholder="Search by Customer ID..."
          />
        </Box>

        {/* Min balance Section */}
        <Box minWidth={200}>
          <Typography
            component="p"
            variant="h6"
            fontSize={20}
            fontFamily="jost"
            fontWeight={600}
            color="text.primary"
            mb={1}
          >
            Min Balance
          </Typography>
          <input
            type="number"
            className="
        w-full
        bg-secondary/10 px-3 py-4
        rounded-lg 
        outline-none font-secondary font-medium
        text-gray-900 dark:text-gray-100
        placeholder:text-gray-400
        focus:ring-2 focus:ring-primary
        transition
      "
            onChange={e => {
              const val = parseInt(e.target.value);
              if (!Number.isNaN(val) && val > -1) {
                setMinBalance(val); // ✅ fixed typo (was setMaxBalance)
              }
            }}
          />
        </Box>

        {/* Max balance Section */}
        <Box minWidth={200}>
          <Typography
            component="p"
            variant="h6"
            fontSize={20}
            fontFamily="jost"
            fontWeight={600}
            color="text.primary"
            mb={1}
          >
            Max Balance
          </Typography>
          <input
            type="number"
            className="
        w-full
        bg-secondary/10 px-3 py-4
        rounded-lg 
        outline-none font-secondary font-medium
        text-gray-900 dark:text-gray-100
        placeholder:text-gray-400
        focus:ring-2 focus:ring-primary
        transition
      "
            onChange={e => {
              const val = parseInt(e.target.value);
              if (!Number.isNaN(val) && val > -1) {
                setMaxBalance(val);
              }
            }}
          />
        </Box>

        {/* Button */}
        <Box>
          <button
            onClick={handleSearch}
            className="
        w-40 md:w-48
        px-4 py-[14px]
        rounded-lg bg-primary
        hover:bg-primary/80
        text-white font-medium
        transition
      "
          >
            Search
          </button>
        </Box>
      </Stack>
    </div>
  );
}

export default CustomersWalletFilterBox;

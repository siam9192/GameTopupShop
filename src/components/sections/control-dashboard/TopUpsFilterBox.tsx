'use client';
import { useTopupPageContext } from '@/app/control-dashboard/products/top-ups/page';
import DashboardSearchInput from '@/components/ui/DashboardSearchInput';
import { Box, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

function TopUpsFilterBox() {
  const [status, setStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { setFilters } = useTopupPageContext();
  const handleSearch = () => {
    const filters: Record<string, string> = {};
    if (status) {
      filters['status'] = status;
    }
    if (searchTerm) {
      filters['searchTerm'] = searchTerm;
    }
    setFilters(filters);
  };
  return (
    <div className="p-5 glass  lg:block hidden">
      <Stack direction="row" gap={2} flexWrap="wrap">
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
            placeholder="Search by ID name, email..."
          />
        </Box>

        {/* Status Section */}
        <Box minWidth={250}>
          <Typography
            component="p"
            variant="h6"
            fontSize={20}
            fontFamily="jost"
            fontWeight={600}
            color="text.primary"
            mb={1}
          >
            Status
          </Typography>
          <FormControl fullWidth>
            <Select
              value={status}
              onChange={e => setStatus(e.target.value)}
              color="primary"
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Active'}>Active</MenuItem>
              <MenuItem value={'Blocked'}>Blocked</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Button */}
        <Box marginTop={5.5}>
          <button
            onClick={handleSearch}
            className="w-60 px-2 py-4 rounded-lg bg-primary hover:bg-primary/80 text-white font-medium"
          >
            Search
          </button>
        </Box>
      </Stack>
    </div>
  );
}

export default TopUpsFilterBox;

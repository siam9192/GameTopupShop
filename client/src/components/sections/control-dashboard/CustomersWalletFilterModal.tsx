'use client';

import DashboardSearchInput from '@/components/ui/DashboardSearchInput';
import { useCustomersWalletPageContext } from '@/provider/CustomersWalletPageProvider';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

function CustomersWalletFilterModal() {
  const [open, setOpen] = React.useState(false);

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
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        size="large"
        variant="outlined"
        sx={{
          display: {
            xs: 'block',
            lg: 'none',
          },
        }}
      >
        Filter
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        className="flex justify-center items-center"
      >
        <div className=" w-10/12 lg:w-1/2 bg-paper p-5 lg:p-10 rounded-lg">
          <Stack direction="column" gap={2}>
            {/* Search Section */}
            <Box flex={1} minWidth={250}>
              <Typography
                component="p"
                variant="h6"
                fontSize={25}
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
                className="w-full md:w-60 px-2 py-4 rounded-lg bg-primary hover:bg-primary/80 text-white font-medium"
              >
                Search
              </button>
            </Box>
          </Stack>
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default CustomersWalletFilterModal;

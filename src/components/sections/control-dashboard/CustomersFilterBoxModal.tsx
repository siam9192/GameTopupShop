'use client';
import { useCustomersPageContext } from '@/app/control-dashboard/users/customers/page';
import DashboardSearchInput from '@/components/ui/DashboardSearchInput';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

function CustomersFilterBoxModal() {
  const [status, setStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { setFilters } = useCustomersPageContext();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSearch = () => {
    const filters: Record<string, string> = {};
    if (status) {
      filters['status'] = status;
    }

    if (searchTerm) {
      filters['searchTerm'] = searchTerm;
    }
    setFilters(filters);
    handleClose();
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

            <button
              onClick={handleSearch}
              className="w-full md:w-60 px-2 py-4 rounded-lg bg-primary hover:bg-primary/80 text-white font-medium"
            >
              Search
            </button>
          </Stack>
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default CustomersFilterBoxModal;

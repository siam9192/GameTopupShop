'use client';

import DashboardSearchInput from '@/components/ui/DashboardSearchInput';
import { useAdministratorsPageContext } from '@/provider/AdministratorsPageProvider';
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
import { FiSearch } from 'react-icons/fi';

function AdministratorsFilterBoxModal() {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState('');
  const [level, setLevel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { setFilters } = useAdministratorsPageContext();

  const handleSearch = () => {
    const filters: Record<string, string> = {};
    if (status) {
      filters['status'] = status;
    }

    if (searchTerm) {
      filters['searchTerm'] = searchTerm;
    }
    if (level) {
      filters['level'] = level;
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
                onChange={va => setSearchTerm(va)}
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
                <Select value={'hi'} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
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
                <Select value={'hi'} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Button */}
            <Box>
              <button className="w-full md:w-60 px-2 py-4 rounded-lg bg-primary hover:bg-primary/80 text-white font-medium">
                Search
              </button>
            </Box>
          </Stack>
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default AdministratorsFilterBoxModal;

import { Box, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';
import React from 'react';
import { FiSearch } from 'react-icons/fi';

function AdministratorsFilterBox() {
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
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            className="bg-secondary/10 px-2 py-4 rounded-lg"
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            <span className="text-xl font-medium text-txt-primary">
              <FiSearch />
            </span>
            <input
              type="text"
              className="grow bg-transparent border-none outline-none font-secondary font-medium text-gray-950 dark:text-gray-100 placeholder:text-primary"
              placeholder="Topup name, game name etc..."
            />
          </Stack>
        </Box>
       
       {/* Level section */}
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
            Level
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
        <Box marginTop={5.5}>
          <button className="w-60 px-2 py-4 rounded-lg bg-primary hover:bg-primary/80 text-white font-medium">
            Search
          </button>
        </Box>
      </Stack>
    </div>
  );
}

export default AdministratorsFilterBox;

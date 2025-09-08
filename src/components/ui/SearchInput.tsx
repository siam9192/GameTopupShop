import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

function SearchInput() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box className="relative">
      <Stack
        sx={{
          display: {
            xs: 'none', // default for mobile
            sm: 'none', // optional, but keeps it hidden on small
            md: 'flex', // visible from medium and up
          },
        }}
        direction={'row'}
        width={400}
        alignItems={'center'}
        gap={1}
        className="bg-secondary/10 px-2 py-3 rounded-lg "
      >
        <span className="text-2xl font-medium text-txt-primary">
          <FiSearch />
        </span>
        <input
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          type="text"
          className="grow bg-transparent border-none outline-none font-secondary  font-medium text-gray-950 dark:text-gray-100 placeholder:text-secondary"
          placeholder="Search games.."
        />
      </Stack>
      {isOpen ? (
        <Box className="w-full absolute left-0 top-14 min-h-60 p-2  z-40 rounded-xl dark:bg-black bg-white shadow_1">
          <Typography color="text.primary" fontWeight={500}>
            20 Search Results
          </Typography>
          <Box mt={2}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Box key={index} className="p-2  mb-2 hover:bg-paper rounded-md ">
                <Stack direction={'row'} spacing={2}>
                  <img
                    src="https://play-lh.googleusercontent.com/Odw8BGugaJLdbaSbCeZWbTE3Qz1wTiQ0Tsn9nzpoQdnkzWb-gaI58zzTmYDvGpdYKg"
                    alt=""
                    className="size-12 rounded-lg"
                  />
                  <Box>
                    <Typography color="text.primary" fontWeight={500}>
                      Free Fire Uid top up
                    </Typography>
                    <Button size="small" color="secondary">
                      Top Up Now
                    </Button>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}

export default SearchInput;

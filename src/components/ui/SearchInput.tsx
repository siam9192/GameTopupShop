'use client';
import { Box, Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import ProductsSearchResultBox from './ProductsSearchResultBox';
import { useDebounce } from 'react-use';
import { usePathname } from 'next/navigation';

function SearchInput() {
  const [isOpen, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    500,
    [searchTerm],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Box ref={ref} className="relative">
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
          onFocus={() => setOpen(true)}
          type="text"
          onChange={e => setSearchTerm(e.target.value.trim())}
          className="grow bg-transparent border-none outline-none font-secondary  font-medium text-gray-950 dark:text-gray-100 placeholder:text-secondary"
          placeholder="Search games.."
        />
      </Stack>
      {isOpen && debouncedSearchTerm ? (
        <ProductsSearchResultBox searchTerm={debouncedSearchTerm} />
      ) : null}
    </Box>
  );
}

export default SearchInput;

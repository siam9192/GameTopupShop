'use client';

import { getSearchProductsQuery } from '@/query/services/utils';
import { SearchProduct } from '@/types/utils.type';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDebounce } from 'react-use';

function ResponsiveProductsSearchInput() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Debounce search term to avoid frequent calls
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  // Query to fetch products
  const { data, isLoading, isRefetching,refetch} = getSearchProductsQuery([
    { name: 'searchTerm', value: debouncedSearchTerm },
    { name: 'page', value: page },
  ]);

  const totalResults = data?.meta?.totalResults || 0;
  
// Append new data to products when fetched
  useEffect(() => {
    if (isLoading || isRefetching || !data?.data) return;

    if (page === 1) {
      setProducts(data.data);
    } else {
      setProducts(prev => [...prev, ...data.data]);
    }

    // Check if more pages exist
    if (totalResults <= page * data.meta?.limit) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [data, page]);

  // Reset when search term changes
  useEffect(() => {
    setPage(1);
    setProducts([]);
    refetch();
  }, [debouncedSearchTerm]);

  // Infinite scroll observer
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading && hasMore) {
        setPage(prev => prev + 1);
      }
    },
    [isLoading, hasMore],
  );

  useEffect(() => {
    const option = { root: null, rootMargin: '20px', threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);



  return (
    <Fragment>
      {/* Mobile Search Icon */}
      <IconButton
        color="secondary"
        sx={{ display: { md: 'none' } }}
        onClick={() => setOpen(true)}
      >
        <FiSearch size={28} />
      </IconButton>

      {/* Search Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: 'hidden',
          },
        }}
      >
        <DialogContent>
          {/* Search Input */}
          <Stack
            direction={'row'}
            alignItems={'center'}
            gap={1}
            sx={{
              width: '100%',
              borderRadius: 2,
              px: 2,
              py: 1.5,
              mb: 2,
              bgcolor: 'background.paper',
              border: theme => `1px solid ${theme.palette.divider}`,
            }}
          >
            <FiSearch size={22} className="text-secondary" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              autoFocus
              placeholder="Search products..."
              className="grow bg-transparent border-none outline-none font-medium text-gray-900 dark:text-gray-100"
            />
          </Stack>

          {/* Search Results */}
          <Box className="relative w-full min-h-60 max-h-[70vh] overflow-y-auto hide-scrollbar">
            <Typography
              color="text.primary"
              fontWeight={600}
              className="text-lg mb-3"
            >
              {debouncedSearchTerm
                ? `${totalResults} Search Results`
                : 'Type to search...'}
            </Typography>

            <Stack spacing={2}>
              {products.map((item) => (
                <Box
                  key={item._id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer relative"
                >
                  <div className="w-14 h-14 flex-shrink-0">
                    <img
                      src={item.coverPhoto}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg shadow-sm"
                    />
                  </div>

                  <Box className="flex-1">
                    <Chip
                      label={item.type}
                      size="small"
                      color="primary"
                      className="absolute top-2 left-1 scale-60"
                    />
                    <Typography
                      color="text.primary"
                      fontWeight={600}
                      className="text-base leading-tight"
                    >
                      {item.name}
                    </Typography>
                  </Box>

                  <Link
                    href={`/${item.type === 'Topup' ? 'top-ups' : 'offers'}/${item._id}`}
                  >
                    <Button
                      size="small"
                      color="secondary"
                      variant="contained"
                      className="rounded-lg px-4 py-1 text-sm font-medium shadow-md"
                    >
                      Visit
                    </Button>
                  </Link>
                </Box>
              ))}

              {((isLoading || isRefetching) && debouncedSearchTerm ) && (
                <Box className="flex justify-center py-3">
                  <CircularProgress size={28} />
                </Box>
              )}

              {/* Infinite Scroll Sentinel */}
              {hasMore && !isLoading && <div ref={loaderRef} className="h-8" />}
            </Stack>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="error">
            Close
          </Button>
          <Button
            onClick={() => setSearchTerm('')}
            color="secondary"
            variant="outlined"
          >
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default ResponsiveProductsSearchInput;

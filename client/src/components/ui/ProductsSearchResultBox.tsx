import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Button, Stack, Typography, CircularProgress, Chip } from '@mui/material';
import { getSearchProductsQuery } from '@/query/services/utils';
import Link from 'next/link';
import { SearchProduct } from '@/types/utils.type';

interface Props {
  searchTerm: string;
  onClose?: () => void | any;
}

function ProductsSearchResultBox({ searchTerm, onClose }: Props) {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Query hook — assuming it refetches automatically when args change
  const { data, isLoading, isRefetching, refetch } = getSearchProductsQuery([
    { name: 'searchTerm', value: searchTerm },
    { name: 'page', value: page },
  ]);

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
  }, [searchTerm]);

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

  const totalResults = data?.meta?.totalResults || 0;

  return (
    <Box className="absolute left-0 top-14 w-full min-h-60 max-h-[70vh] overflow-y-auto p-4 z-40 rounded-2xl bg-white dark:bg-neutral-900 shadow-lg border border-gray-200 dark:border-neutral-700 transition-all hide-scrollbar">
      <Typography color="text.primary" fontWeight={600} className="text-lg mb-3">
        {totalResults} Search Results
      </Typography>

      <Stack spacing={2}>
        {products.map((item, index) => (
          <Box
            key={index}
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
              <Typography color="text.primary" fontWeight={600} className="text-base leading-tight">
                {item.name}
              </Typography>
            </Box>

            <Link href={`/${item.type === 'Topup' ? 'top-ups' : 'offers'}/${item._id}`}>
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

        {(isLoading || isRefetching) && (
          <Box className="flex justify-center py-3">
            <CircularProgress size={28} />
          </Box>
        )}

        {/* Sentinel for intersection observer */}
        {hasMore && !isLoading && <div ref={loaderRef} className="h-8" />}
      </Stack>
    </Box>
  );
}

export default ProductsSearchResultBox;

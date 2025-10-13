'use client';
import { getProductsMetadataQuery } from '@/query/services/metadata';
import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { MdInventory, MdFlashOn, MdLocalOffer, MdNewReleases } from 'react-icons/md';

const defaultValue = 999;

function ProductsOverviewData() {
  const { data: resData, isLoading } = getProductsMetadataQuery();
  const metadata = resData?.data;
  const data = [
    {
      name: 'Product',
      icon: MdInventory,
      value: isLoading ? defaultValue : metadata?.products,
    },
    {
      name: 'Topup',
      icon: MdFlashOn,
      value: isLoading ? defaultValue : metadata?.topups,
    },
    {
      name: 'Offer',
      icon: MdLocalOffer,
      value: isLoading ? defaultValue : metadata?.offers,
    },
    {
      name: 'Recent Product',
      icon: MdNewReleases,
      value: isLoading ? defaultValue : metadata?.newProducts,
    },
  ];

  return (
    <div>
      <Grid
        container
        spacing={2}
        columns={{
          xs: 1,
          sm: 1,
          md: 2,
          lg: 4,
        }}
      >
        {data.map((_, index) => (
          <Grid size={1} key={index}>
            <div className=" glass shadow_1  p-3 md:p-5 rounded-lg min-h-52">
              <Typography fontWeight={600} fontSize={20} variant="caption" color="text.primary">
                {_.name}
              </Typography>
              <Stack
                marginTop={5}
                direction={'row'}
                gap={2}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <span>
                  <_.icon className="text-txt-primary  text-4xl md:text-6xl" />
                </span>
                <Typography
                  fontWeight={600}
                  align="center"
                  component={'h1'}
                  variant="h3"
                  fontSize={{
                    xs: 28,
                    sm: 30,
                    md: 40,
                  }}
                  color="secondary"
                  fontFamily={'jost'}
                >
                  {_.value?.toLocaleString()}
                </Typography>
              </Stack>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ProductsOverviewData;

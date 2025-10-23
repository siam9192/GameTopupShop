import LivePaymentMethodCard from '@/components/cards/LivePaymentMethodCard';
import { getPublicLivePaymentMethodsQuery } from '@/query/services/live-payment-method';
import { Box, CircularProgress, Grid, Pagination, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

function LivePayment() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = getPublicLivePaymentMethodsQuery([
    {
      name: 'page',
      value: page,
    },
    {
      name: 'limit',
      value: 20,
    },
  ]);
  const methods = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta ? Math.ceil(meta.totalResults / meta.limit) : 0;

  return (
    <Box>
      <Box>
        <Typography color="text.primary" fontSize={22} fontWeight={600} gutterBottom>
          Make Live Payment
        </Typography>

        <Typography color="text.secondary" fontSize={16} lineHeight={1.7}>
          Complete your transaction manually by following the provided payment instructions. After
          sending the payment, please upload your transaction details or receipt for verification.
          Once confirmed, your balance or order will be updated automatically.
        </Typography>
      </Box>
      <Box marginTop={3}>
        <Typography color="text.primary" fontSize={22} fontWeight={600} gutterBottom>
          Available Methods :
        </Typography>

        {isLoading ? (
          <Box height={300} display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : meta?.totalResults === 0 ? (
          <Box height={300} display="flex" justifyContent="center" alignItems="center">
            <Typography color="text.primary" align="center" fontSize={20}>
              No methods available
            </Typography>
          </Box>
        ) : methods?.length ? (
          <>
            <Grid
              container
              marginTop={2}
              columns={{
                xs: 1,
                md: 2,
                lg: 4,
                xl: 5,
              }}
              gap={5}
            >
              {methods.map(method => (
                <Grid size={1} key={method._id || method.name}>
                  <LivePaymentMethodCard method={method} />
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Stack direction="row" justifyContent="center" mt={4}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                  showFirstButton
                  showLastButton
                />
              </Stack>
            )}
          </>
        ) : (
          <Box height={300} display="flex" justifyContent="center" alignItems="center">
            <Typography color="text.primary" align="center" fontSize={20}>
              No Methods found
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default LivePayment;

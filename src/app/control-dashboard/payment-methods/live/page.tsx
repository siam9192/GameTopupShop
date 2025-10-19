'use client';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { getLivePaymentMethodsQuery, updateLivePaymentMethodStatusMutation } from '@/query/services/live-payment-method';
import { LivePaymentMethodStatus } from '@/types/live-payment-method.type';
import { Box, Button, Chip, CircularProgress, Grid, Pagination, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';


function page() {
  const [page,setPage] =  useState(1)
  
  const {data,isLoading} =  getLivePaymentMethodsQuery([
    {
      name:'page',
      value:page
    }
  ])
  const methods =  data?.data
  const meta = data?.meta
   const totalPages = meta ? Math.ceil(meta.totalResults / meta.limit) : 0;
   const {mutate,isPending} =  updateLivePaymentMethodStatusMutation()
   const handelUpdateStatus = (
    id:string,
    status:LivePaymentMethodStatus
   )=> {
    mutate({
      id,
      status
    },{
      onSuccess:(data)=>{
        toast.success(data.message)
      },
      onError:(data)=>{
          toast.error(data.message)
      }
    })
   }
  return (
    <div>
      <DashboardPageHeading title="Live Payment Methods" />
      {
        isLoading ?
        (
             <div className="h-[300px] flex justify-center items-center">
                    <CircularProgress />
                  </div>
        )
        :
(
  <>
     <Box
        mt={5}
        width={{
          lg: '80%',
        }}
      >
      
        
          <Grid
      container
      spacing={2}
      columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
    >
      {methods?.map((method) => {
        const isActive = method.status === LivePaymentMethodStatus.ACTIVE;
        const buttonText = isActive ? 'Deactivate' : 'Activate';
        const buttonColor = isActive ? 'error' : 'success';

        return (
          <Grid size={1} key={method.name}>
    <div
  className="
    py-5 px-6 glass
    transition-all duration-300 min-h-64
  "
>
  {/* Logo */}
  <div className="flex justify-center">
    <div className="p-3 bg-white/10 rounded-full backdrop-blur-md shadow-inner">
      <img
        src={method.logo}
        alt={method.name}
        className="size-24 sm:size-28 md:size-32 object-contain rounded-full"
      />
    </div>
  </div>

  {/* Name */}
  <Typography
    mt={2}
    color="secondary"
    align="center"
    fontSize={{ xs: 16, sm: 18 }}
    fontWeight={700}
    className="tracking-wide"
  >
    {method.name}
  </Typography>

  {/* Status + Button */}
  <Stack
    direction="column"
    alignItems="center"
    spacing={1.5}
    mt={2}
    className="text-center"
  >
    <Chip
      variant="outlined"
      color={isActive ? 'success' : 'default'}
      label={method.status}
      className="font-semibold px-2"
      sx={{
        textTransform: 'capitalize',
        fontSize: '0.85rem',
        borderWidth: 1.5,
      }}
    />

    <Button
      variant="contained"
      color={buttonColor as any}
      disabled={isPending}
      size="small"
      className="!normal-case font-semibold px-5 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
      onClick={() => handelUpdateStatus(method._id,method.status === LivePaymentMethodStatus.ACTIVE ? LivePaymentMethodStatus.INACTIVE : LivePaymentMethodStatus.ACTIVE)}
    >
      {buttonText}
    </Button>
  </Stack>
</div>
          </Grid>
        );
      })}
   
       
        </Grid>
      </Box>

         <Box mt={5}>
        {
              <Pagination
                        style={{ marginTop: '15px' }}
                        count={totalPages}
                        onChange={(e, value) => setPage(value)}
                        size="large"
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                      />
        }
      </Box>
      </>
)
      }
   
   
    </div>
  );
}

export default page;

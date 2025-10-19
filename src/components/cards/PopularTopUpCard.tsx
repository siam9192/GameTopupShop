import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import AlertDialog from '../ui/AleartDialog';
import { PopularTopup } from '@/types/topup.type';

interface Props {
  topup:PopularTopup
}

function PopularTopUpCard({topup}:Props) {
  return (
      <div className=" p-2 md:p-3 relative ">
         <Stack
           direction={{
             xs: 'column',
             md: 'row',
           }}
           spacing={2}
         >
           <Typography color="primary" fontSize={25} fontWeight={600}>
             {topup.rank}.
           </Typography>
           <Box>
             <img
               src={topup.coverPhoto}
               alt=""
               className=" size-20 rounded-lg"
             />
           </Box>
           <Stack spacing={0.5}>
             <Typography fontWeight={500} fontSize={20} color="text.primary">
             {topup.name}
             </Typography>
             <Typography
               fontSize={{
                 xs: 14,
                 lg: 16,
               }}
               fontWeight={500}
               color="text.secondary"
             >
               ID:
               <Typography
                 fontSize={'inherit'}
                 component={'span'}
                 display={'inline'}
                 fontWeight={500}
                 color="success"
               >
                 {' '}
                 #{topup._id}
               </Typography>
             </Typography>
             <Stack
               marginTop={2}
               direction={'row'}
               alignItems={'center'}
               spacing={{
                 xs: 1,
                 md: 2,
               }}
             >
               <Typography
                 fontWeight={500}
                 fontSize={{
                   xs: 14,
                   lg: 16,
                 }}
                 color="text.secondary"
               >
                 Revenue: {topup.revenue}
               </Typography>
               <Typography
                 fontSize={{
                   xs: 14,
                   lg: 16,
                 }}
                 fontWeight={500}
                 color="text.secondary"
               >
                 Order:  {topup.ordersCount} BDT
               </Typography>
               <Typography
                 fontSize={{
                   xs: 14,
                   lg: 16,
                 }}
                 fontWeight={500}
                 color="text.secondary"
               >
                 Status:
                 <Typography
                   fontSize={'inherit'}
                   component={'span'}
                   display={'inline'}
                   fontWeight={500}
                   color="success"
                 >
                   {' '}
                   {topup.status}
                 </Typography>
               </Typography>
             </Stack>
           </Stack>
         </Stack>
   
         <Stack marginTop={1} direction={'row'} alignItems={'center'} justifyContent={'end'} gap={1}>
           <Stack direction={'row'} spacing={2}>
            
               <Button variant="outlined" className="w-fit " color="secondary">
                 Details
               </Button>
             
       
           </Stack>
         </Stack>
       </div>
  );
}

export default PopularTopUpCard;

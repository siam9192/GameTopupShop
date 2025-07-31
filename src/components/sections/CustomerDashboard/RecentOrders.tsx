import RecentOrderCard from '@/components/cards/RecentOrderCard'
import { Badge, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { TbRecharging } from 'react-icons/tb'

function RecentOrders() {
  return (
    <Stack className='glass p-3 md:p-5  '>
       <Stack direction={'row'}  justifyContent={'space-between'} alignItems={'center'}>
         <Typography component={'h1'} variant='h5' fontFamily={'jost'} fontWeight={600}  color='text.primary'>
            Recent Orders
        </Typography>
        <Badge color="secondary" badgeContent={10} variant="standard">
            <TbRecharging  className='text-txt-primary' size={28}/>
            </Badge>
       </Stack>
      
       <Stack spacing={2}>
        {
        Array.from({length:6}).map((_,index)=>(
         <div key={index}>
            <RecentOrderCard />
            <Divider    variant='fullWidth' light  orientation="vertical" flexItem />
         </div>
            
        ))
        }
       </Stack>
      
    </Stack>
  )
}

export default RecentOrders
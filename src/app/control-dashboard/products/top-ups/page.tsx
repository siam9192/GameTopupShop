import TopUpsFilterBox from '@/components/sections/control-dashboard/TopUpsFilterBox';
import TopUpsFilterBoxModal from '@/components/sections/control-dashboard/TopUpsFilterBoxModal';
import TopUpsTable from '@/components/sections/control-dashboard/TopUpsTable';
import { Typography } from '@mui/material';
import React from 'react';

function page() {
  return (
    <div>
      <Typography
        component="h1"
        variant="h4"
        fontFamily="jost"
        fontWeight={600}
        color="text.primary"
        mb={2}
      >
        Top ups
      </Typography>
      <TopUpsFilterBox />
     <div className='flex justify-end'>
       <TopUpsFilterBoxModal/>
     </div>
      <TopUpsTable />
    </div>
  );
}

export default page;

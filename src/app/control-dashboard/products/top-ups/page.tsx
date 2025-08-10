import TopUpsFilterBox from '@/components/sections/control-dashboard/TopUpsFilterBox';
import TopUpsFilterBoxModal from '@/components/sections/control-dashboard/TopUpsFilterBoxModal';
import TopUpsTable from '@/components/sections/control-dashboard/TopUpsTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { Typography } from '@mui/material';
import React from 'react';

function page() {
  return (
    <div>
      <DashboardPageHeading title="Top ups" />
      <TopUpsFilterBox />
      <div className="flex justify-end">
        <TopUpsFilterBoxModal />
      </div>
      <TopUpsTable />
    </div>
  );
}

export default page;

import OffersFilterBox from '@/components/sections/control-dashboard/OffersFilterBox';
import OffersFilterBoxModal from '@/components/sections/control-dashboard/OffersFilterModal';
import OffersTable from '@/components/sections/control-dashboard/OffersTable';
import TopUpsFilterBox from '@/components/sections/control-dashboard/TopUpsFilterBox';
import TopUpsFilterBoxModal from '@/components/sections/control-dashboard/TopUpsFilterBoxModal';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { Typography } from '@mui/material';
import React from 'react';

function page() {
  return (
    <div>
      <DashboardPageHeading title="Offers" />
      <OffersFilterBox />
      <div className="flex justify-end">
        <OffersFilterBoxModal />
      </div>
      <OffersTable />
    </div>
  );
}

export default page;

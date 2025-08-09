import OffersFilterBox from '@/components/sections/control-dashboard/OffersFilterBox';
import OffersFilterBoxModal from '@/components/sections/control-dashboard/OffersFilterModal';
import OffersTable from '@/components/sections/control-dashboard/OffersTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
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

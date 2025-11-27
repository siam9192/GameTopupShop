import OffersFilterBox from '@/components/sections/control-dashboard/OffersFilterBox';
import OffersFilterBoxModal from '@/components/sections/control-dashboard/OffersFilterBoxModal';
import OffersTable from '@/components/sections/control-dashboard/OffersTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import ManageOffersPageProvider from '@/provider/ManageOffersPageProvider';
import React from 'react';

function page() {
  return (
    <ManageOffersPageProvider>
      <div>
        <DashboardPageHeading title="Offers" />
        <OffersFilterBox />
        <div className="flex justify-end">
          <OffersFilterBoxModal />
        </div>
        <OffersTable />
      </div>
    </ManageOffersPageProvider>
  );
}

export default page;

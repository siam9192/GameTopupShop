import TopUpsFilterBox from '@/components/sections/control-dashboard/TopUpsFilterBox';
import TopUpsFilterBoxModal from '@/components/sections/control-dashboard/TopUpsFilterBoxModal';
import TopUpsTable from '@/components/sections/control-dashboard/TopUpsTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import ManageTopupsPageProvider from '@/provider/ManageTopupsPageProvider';
import React from 'react';

function page() {
  return (
    <ManageTopupsPageProvider>
      <div>
        <DashboardPageHeading title="Top ups" />
        <TopUpsFilterBox />
        <div className="flex justify-end">
          <TopUpsFilterBoxModal />
        </div>
        <TopUpsTable />
      </div>
    </ManageTopupsPageProvider>
  );
}

export default page;

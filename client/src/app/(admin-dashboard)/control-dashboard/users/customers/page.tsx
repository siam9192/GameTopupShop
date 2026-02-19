import CustomersFilterBox from '@/components/sections/control-dashboard/CustomersFilterBox';
import CustomersFilterBoxModal from '@/components/sections/control-dashboard/CustomersFilterBoxModal';
import CustomersTable from '@/components/sections/control-dashboard/CustomersTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import CustomersPageProvider from '@/provider/CustomersPageProvider';
import React from 'react';

function page() {
  return (
    <CustomersPageProvider>
      <div>
        <DashboardPageHeading title="Top ups" />
        <CustomersFilterBox />
        <div className="flex justify-end">
          <CustomersFilterBoxModal />
        </div>
        <CustomersTable />
      </div>
    </CustomersPageProvider>
  );
}

export default page;

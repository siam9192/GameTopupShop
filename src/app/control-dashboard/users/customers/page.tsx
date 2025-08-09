import CustomersFilterBox from '@/components/sections/control-dashboard/CustomersFilterBox';
import CustomersFilterBoxModal from '@/components/sections/control-dashboard/CustomersFilterBoxModal';
import CustomersTable from '@/components/sections/control-dashboard/CustomersTable';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import React from 'react';

function page() {
  return (
    <div>
      <DashboardPageHeading title="Customers" />
      <CustomersFilterBox />
      <div className="flex justify-end">
        <CustomersFilterBoxModal />
      </div>
      <CustomersTable />
    </div>
  );
}

export default page;
